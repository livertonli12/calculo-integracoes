module.exports = {
    "_id" : "5787df4cfb5ac37c26503bbf",
    "company" : "56685e221619835c3349ca4a",
    "updated_at" : "2016-07-14T18:51:56.737Z",
    "updated_by" : "56685e221619835c3349ca4d",
    "created_by" : "56685e221619835c3349ca4d",
    "name" : "Teste de Integração",
    "trigger_application" : "5731b8c95ac69426001df0ce",
    "trigger" : "5783b53d9e61c13700da24db",
    "action_application" : "5731b8c95ac69426001df07b",
    "action" : "5783b53d9e61c13700da24e0",
    "trigger_connection" : "5731b8c95ac69426001df0d2",
    "action_connection" : "5731b8c95ac69426001df0ca",
    "created_at" : "2016-07-14T18:51:56.737Z",
    "general_frequency" : {
        "frequency" : "daily",
        "recurrence" : 1,
        "end_date" : "2016-07-14T03:00:00.000Z",
        "days_of_week" : []
    },
    "daily_frequency" : {
        "recurrence" : 10,
        "recurrence_unit" : "minutes",
        "start_date" : "1970-01-01T10:00:00.000Z",
        "end_date" : "1970-01-02T00:00:00.000Z"
    },
    "match_params" : [ 
        {
            "from" : "{{Sku}}",
            "from_label" : "{{Sku do Produto}}",
            "to" : "SellerSku",
            "_id" : "5787df4cfb5ac37c26503bc1"
        }, 
        {
            "from" : "{{Imagens[x].Link}}",
            "from_label" : "{{Link da Imagem}}",
            "to" : "Images[x].Image",
            "_id" : "5787df4cfb5ac37c26503bc0"
        }
    ],
    "trigger_filters" : [],
    "active" : true,
    "status" : "complete",
    "date_next_exec": null,
    "date_last_exec": null,
    "__v" : 0
};