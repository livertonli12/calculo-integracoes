var moment = require('moment'),
    _ = require('lodash'),
	integration = require('./integracao_obj_week');

integration.date_next_exec = null;
integration.date_last_exec = moment("2016-07-14T23:59:59");

console.log("Iniciando execução, agora são: ", moment().format());
console.log("Próxima execução em: ", returnNextExecution(integration).date_next_exec);

function returnNextExecution(integration) {
	if (integration.general_frequency) {
		if (integration.general_frequency.frequency === 'days') {
			integration.date_next_exec = calcFrequencyDays(integration);
		} else if (integration.general_frequency.frequency === 'weeks') {
			integration.date_next_exec = calcFrequencyWeeks(integration);
		} else if (integration.general_frequency.frequency === 'months') {
			integration.date_next_exec = calcFrequencyMonths(integration);
		}
	} else {
		integration.date_next_exec = moment().add(1, 'minute').format();
	}

	return integration;
};

function calcFreqWithinDailyFreq(general_frequency, daily_frequency) {
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

	if (daily_frequency.start_date) {
		start_date_minutes = moment(daily_frequency.start_date).get('minute');
		start_date_hours = moment(daily_frequency.start_date).get('hour');
		start_date = moment().set({ 'hour': start_date_hours, 'minute': start_date_minutes, 'second': '00' });
	}

	if (integration.daily_frequency.recurrence !== null && integration.daily_frequency.recurrence_unit) {
		next_exec = moment().add(recurrence, recurrence_unit);
		if (moment().isAfter(end_date)) {
			next_exec = moment().add(general_frequency.recurrence, general_frequency.frequency)
				.set({ 'hour': start_date_hours, 'minute': start_date_minutes });
		}
	} else {
		next_exec = moment().add(1, 'minutes');
	}

	return next_exec.format();
};

function calcFrequencyDays (integration) {
	if (integration.daily_frequency) {
		integration.date_next_exec = moment(calcFreqWithinDailyFreq(integration.general_frequency, integration.daily_frequency)).format();
	} else {
		if (integration.date_last_exec !== null) {
			var last_exec = moment(integration.date_last_exec);
			if (moment().get('date') === last_exec.get('date') && last_exec.isBefore(moment().endOf('day'))) {
				integration.date_next_exec = moment().add(1, 'minute').format();
			} else {
				integration.date_next_exec = moment().add(integration.general_frequency.recurrence || 1, integration.general_frequency.frequency)
					.set({ 'hour': '00', 'minute': '00', 'second': '00' }).format();
			}
		} else {
			integration.date_next_exec = moment().format();
		}
	}
	return integration.date_next_exec;
};

function calcFrequencyWeeks (integration) {
	if (integration.daily_frequency) {
		integration.date_next_exec = moment(calcFreqWithinDailyFreq(integration.general_frequency, integration.daily_frequency)).format();
	} else {
		if (integration.date_last_exec !== null) {

			var last_exec = moment(integration.date_last_exec);
			var weekDay = 7;

			if (moment().get('date') === last_exec.get('date') && last_exec.isBefore(moment().endOf('day')) && integration.general_frequency.days_of_week.includes(weekDay)) {
				integration.date_next_exec = moment().add(1, 'minute').format();
			} else {

				var nearestDay = _.filter(integration.general_frequency.days_of_week, function (day) { return day > weekDay; })[0];
				var firstWeekDay = _.filter(integration.general_frequency.days_of_week, function (day) { return day !== null; })[0];

				if (nearestDay !== undefined) {
					integration.date_next_exec = moment().add((nearestDay - weekDay), 'days').set({ 'hour': '00', 'minute': '00', 'second': '00' }).format();
				} else {
					integration.date_next_exec = moment().isoWeekday(firstWeekDay).add(2, 'weeks').set({ 'hour': '00', 'minute': '00', 'second': '00' }).format();
				}
			}
		} else {
			integration.date_next_exec = moment().format();
		}
	}

	return integration.date_next_exec;
};

function calcFrequencyMonths(integration) {
	if (integration.daily_frequency) {
		integration.date_next_exec = moment(calcFreqWithinDailyFreq(integration.general_frequency, integration.daily_frequency)).format();
	} else {
		if (integration.date_last_exec !== null) {
			var last_exec = moment(integration.date_last_exec);
			if (moment().get('date') === last_exec.get('date') && last_exec.isBefore(moment().endOf('day'))) {
				integration.date_next_exec = moment().add(1, 'minute').format();
			} else {
				integration.date_next_exec = moment().add(integration.general_frequency.recurrence || 1, integration.general_frequency.frequency)
					.set({ 'day': '01', 'hour': '00', 'minute': '00', 'second': '00' }).format();
			}
		} else {
			integration.date_next_exec = moment().format();
		}
	}

	return integration.date_next_exec;
};