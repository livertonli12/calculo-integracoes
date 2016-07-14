var moment = require('moment');
var integration = require('./integracao_obj.js');
integration.date_next_exec = null;

console.log("************************************************************");
console.log("Iniciando execução, agora são: ", moment().format());
console.log("************************************************************");

if(integration.general_frequency){
	if (integration.general_frequency.frequency === 'daily') {

		if (integration.daily_frequency) {
			temp_next_exec = calcNextExecWithinDailyFrequency(integration.daily_frequency, temp_next_exec);
		} else {
			if (integration.date_last_exec !== null) {
				var last_exec = moment(integration.date_last_exec);

				if (moment().get('date') === last_exec.get('date') && last_exec.isBefore(moment().endOf('day'))) {
					//ainda não terminou o dia e estamos no mesmo dia.
					integration.date_next_exec = moment().add(1, 'minute');
				} else {
					//já terminou o dia ... fudeu
					integration.date_next_exec = moment().add(integration.general_frequency.recurrence, 'days');
				}
			} else {
				integration.date_next_exec = moment().add(integration.general_frequency.recurrece, 'days');
			}
		}		
		
	} else if (integration.general_frequency.frequency === 'weekly') {


		///
		if (integration.daily_frequency) {
			temp_next_exec = calcNextExecWithinDailyFrequency(integration.daily_frequency, temp_next_exec);
		}
		///
		
	} else if (integration.general_frequency.frequency === 'monthly') {


		///
		if (integration.daily_frequency) {
			temp_next_exec = calcNextExecWithinDailyFrequency(integration.daily_frequency, temp_next_exec);
		}
		///
		
	}
} else {
	integration.date_next_exec = moment().add(1, 'minute');
}

function calcNextExecWithinDailyFrequency(general_frequency, daily_frequency, temp_next_exec){
	var recurrence = integration.daily_frequency.recurrence;
	var recurrence_unit = integration.daily_frequency.recurrence_unit;

	var end_date = moment();
	var end_date_hours = '23';
	var end_date_minutes = '59';
	
	var start_date = moment();
	var start_date_hours = '00';
	var start_date_minutes = '00';
	
	if (daily_frequency.end_date) {
		end_date_minutes = moment(daily_frequency.end_date).get('minute');
		end_date_hours = moment(daily_frequency.end_date).get('hour');
		end_date = moment().set({ 'hour': end_date_hours, 'minute': end_date_minutes, 'second': '00' });
	}	

	if (daily_frequency.start_date){
		start_date_minutes = moment(daily_frequency.start_date).get('minute');
		start_date_hours = moment(daily_frequency.start_date).get('hour');
		start_date = moment().set({ 'hour': start_date_hours, 'minute': start_date_minutes, 'second': '00' });
	}
	
	if (integration.daily_frequency.recurrence !== null && integration.daily_frequency.recurrence_unit) {	
		
		temp_next_exec = moment(temp_next_exec).add(recurrence, recurrence_unit);

		if (moment(temp_next_exec).isAfter(end_date)) {

			console.log("************************************************************");
			console.log("Ultrapassou o limite do dia, calculando novo dia de execução");
			console.log("************************************************************");
			temp_next_exec = moment(temp_next_exec).add(general_frequency.recurrence, 'days').set({'hour': start_date_hours, 'minute': start_date_minutes});
		}

	} else {
		
		temp_next_exec = moment(temp_next_exec).add(1, 'minutes');

	}
	
	return temp_next_exec;
}
