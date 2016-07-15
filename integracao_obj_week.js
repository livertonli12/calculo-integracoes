module.exports = 
{
    "_id" : "5787eb66fb5ac37c26503bc9",
    "company" : "56685e221619835c3349ca4a",
    "updated_at" : "2016-07-15T17:26:28.614Z",
    "updated_by" : "56685e221619835c3349ca4d",
    "created_by" : "56685e221619835c3349ca4d",
    "name" : "asdasdsa",
    "trigger_application" : "5731b8c95ac69426001df0ce",
    "trigger" : "5783b53d9e61c13700da24db",
    "action_application" : "5731b8c95ac69426001df07b",
    "action" : "5783b53d9e61c13700da24e0",
    "trigger_connection" : "5731b8c95ac69426001df0d2",
    "action_connection" : "5731b8c95ac69426001df0ca",
    "created_at" : "2016-07-14T19:43:34.078Z",
    "general_frequency" : {
        "frequency" : "weeks",
        "recurrence" : 1,
        "end_date" : "2016-07-14T03:00:00.000Z",
        "days_of_week" : [ 
            5, 
            7
        ]
    },
    "match_params" : [ 
        {
            "from" : "{{Sku}}",
            "from_label" : "{{Sku do Produto}}",
            "to" : "SellerSku",
            "_id" : "5787eb66fb5ac37c26503bcb"
        }, 
        {
            "from" : "{{Imagens[x].Link}}",
            "from_label" : "{{Link da Imagem}}",
            "to" : "Images[x].Image",
            "_id" : "5787eb66fb5ac37c26503bca"
        }
    ],
    "trigger_filters" : [],
    "active" : true,
    "status" : "complete",
    "__v" : 0
};