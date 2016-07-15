var moment = require('moment');
var integration = require('./integracao_obj.js');
integration.date_next_exec = null;
var temp_next_exec = null;
console.log("************************************************************");
console.log("Iniciando execução, agora são: ", moment().format());
console.log("************************************************************");
integration.date_last_exec = moment("2016-07-15T00:00:00.00");

if(integration.general_frequency){
	
	if (integration.general_frequency.frequency === 'daily') {

		if (integration.daily_frequency) {
			temp_next_exec = calcWithinDailyFrequency(integration.general_frequency, integration.daily_frequency, temp_next_exec);
		} else {
			if (integration.date_last_exec !== null) {
				var last_exec = moment(integration.date_last_exec);

				if (moment().get('date') === last_exec.get('date') && last_exec.isBefore(moment().endOf('day'))) {
					integration.date_next_exec = moment().add(1, 'minute');
				} else {
					integration.date_next_exec = moment().add(integration.general_frequency.recurrence, 'days')
						.set({'hour':'00', 'minute':'00', 'second':'00'});
				}
			} else {
				integration.date_next_exec = moment().format();
			}
		}		
		
	} else if (integration.general_frequency.frequency === 'weekly') {
		//checar se tem frequencia diaria e se hoje é um dos dias em que a integração deve rodar.....
		if (integration.daily_frequency) {
			temp_next_exec = calcWithinDailyFrequency(integration.general_frequency, integration.daily_frequency, temp_next_exec);
		} else {
			if (integration.date_last_exec !== null) {
				var last_exec = moment(integration.date_last_exec);

				//checar se hoje é um dia da semana em que a integração deveria rodar e se o dia e a semana ainda nao terminaram
				if (moment().get('date') === last_exec.get('date') && last_exec.isBefore(moment().endOf('day'))) {
					integration.date_next_exec = moment().add(1, 'minute');
				} else {
					//garantir que a próxima data de execução será atribuida ao dia mais próximo dos que haviam sido configurados
					//perante o dia de hoje.
					integration.date_next_exec = moment().add(integration.general_frequency.recurrence, 'months')
						.set({'hour':'00', 'minute':'00', 'second':'00'});
				}
			} else {
				//garantir que a próxima data de execução será atribuida ao dia mais próximo dos que haviam sido configurados
				//perante o dia de hoje.
				integration.date_next_exec = moment().format();
			}
		}


	} else if (integration.general_frequency.frequency === 'monthly') {
		if (integration.daily_frequency) {
			temp_next_exec = calcWithinDailyFrequency(integration.general_frequency, integration.daily_frequency, temp_next_exec);
		} else {
			if (integration.date_last_exec !== null) {
				var last_exec = moment(integration.date_last_exec);

				if (moment().get('date') === last_exec.get('date') && last_exec.isBefore(moment().endOf('day'))) {
					integration.date_next_exec = moment().add(1, 'minute');
				} else {
					integration.date_next_exec = moment().add(integration.general_frequency.recurrence, 'months')
						.set({'hour':'00', 'minute':'00', 'second':'00'});
				}
			} else {
				integration.date_next_exec = moment().format();
			}
		}
	}
} else {
	integration.date_next_exec = moment().add(1, 'minute');
}

console.log(integration.date_next_exec.format());

function calcWithinDailyFrequency(general_frequency, daily_frequency, temp_next_exec){
	var next_exec = null;

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

		next_exec = moment().add(recurrence, recurrence_unit);

		if (moment(temp_next_exec).isAfter(end_date)) {
			next_exec = moment().add(general_frequency.recurrence, 'days')
									 .set({'hour': start_date_hours, 'minute': start_date_minutes});
		} 

	} else {
		next_exec = moment(temp_next_exec).add(1, 'minutes');
	}
	
	console.log("Próxima execução em: ", next_exec.format());
	return next_exec;
}
