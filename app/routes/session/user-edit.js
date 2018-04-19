var _                = require('lodash')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')
var CategoryCodes    = require('../utils/category-codes')
var AudienceSlugs = require('../utils/audience-slugs')

var _states = [{"name":"Alabama","code":"AL"},{"name":"Alaska","code":"AK"},{"name":"American Samoa","code":"AS"},{"name":"Arizona","code":"AZ"},{"name":"Arkansas","code":"AR"},{"name":"California","code":"CA"},{"name":"Colorado","code":"CO"},{"name":"Connecticut","code":"CT"},{"name":"Delaware","code":"DE"},{"name":"District Of Columbia","code":"DC"},{"name":"Federated States Of Micronesia","code":"FM"},{"name":"Florida","code":"FL"},{"name":"Georgia","code":"GA"},{"name":"Guam","code":"GU"},{"name":"Hawaii","code":"HI"},{"name":"Idaho","code":"ID"},{"name":"Illinois","code":"IL"},{"name":"Indiana","code":"IN"},{"name":"Iowa","code":"IA"},{"name":"Kansas","code":"KS"},{"name":"Kentucky","code":"KY"},{"name":"Louisiana","code":"LA"},{"name":"Maine","code":"ME"},{"name":"Marshall Islands","code":"MH"},{"name":"Maryland","code":"MD"},{"name":"Massachusetts","code":"MA"},{"name":"Michigan","code":"MI"},{"name":"Minnesota","code":"MN"},{"name":"Mississippi","code":"MS"},{"name":"Missouri","code":"MO"},{"name":"Montana","code":"MT"},{"name":"Nebraska","code":"NE"},{"name":"Nevada","code":"NV"},{"name":"New Hampshire","code":"NH"},{"name":"New Jersey","code":"NJ"},{"name":"New Mexico","code":"NM"},{"name":"New York","code":"NY"},{"name":"North Carolina","code":"NC"},{"name":"North Dakota","code":"ND"},{"name":"Northern Mariana Islands","code":"MP"},{"name":"Ohio","code":"OH"},{"name":"Oklahoma","code":"OK"},{"name":"Oregon","code":"OR"},{"name":"Palau","code":"PW"},{"name":"Pennsylvania","code":"PA"},{"name":"Puerto Rico","code":"PR"},{"name":"Rhode Island","code":"RI"},{"name":"South Carolina","code":"SC"},{"name":"South Dakota","code":"SD"},{"name":"Tennessee","code":"TN"},{"name":"Texas","code":"TX"},{"name":"Utah","code":"UT"},{"name":"Vermont","code":"VT"},{"name":"Virgin Islands","code":"VI"},{"name":"Virginia","code":"VA"},{"name":"Washington","code":"WA"},{"name":"West Virginia","code":"WV"},{"name":"Wisconsin","code":"WI"},{"name":"Wyoming","code":"WY"},{"name":"Other not US","code": "OT"}]
var _countries = [{name:'Afghanistan',code:'AF'},{name:'Aland Islands',code:'AX'},{name:'Albania',code:'AL'},{name:'Algeria',code:'DZ'},{name:'American Samoa',code:'AS'},{name:'Andorra',code:'AD'},{name:'Angola',code:'AO'},{name:'Anguilla',code:'AI'},{name:'Antarctica',code:'AQ'},{name:'Antigua and Barbuda',code:'AG'},{name:'Argentina',code:'AR'},{name:'Armenia',code:'AM'},{name:'Aruba',code:'AW'},{name:'Australia',code:'AU'},{name:'Austria',code:'AT'},{name:'Azerbaijan',code:'AZ'},{name:'Bahamas',code:'BS'},{name:'Bahrain',code:'BH'},{name:'Bangladesh',code:'BD'},{name:'Barbados',code:'BB'},{name:'Belarus',code:'BY'},{name:'Belgium',code:'BE'},{name:'Belize',code:'BZ'},{name:'Benin',code:'BJ'},{name:'Bermuda',code:'BM'},{name:'Bhutan',code:'BT'},{name:'Bolivia',code:'BO'},{name:'Bosnia and Herzegovina',code:'BA'},{name:'Botswana',code:'BW'},{name:'Bouvet Island',code:'BV'},{name:'Brazil',code:'BR'},{name:'British Indian Ocean Territory',code:'IO'},{name:'Brunei Darussalam',code:'BN'},{name:'Bulgaria',code:'BG'},{name:'Burkina Faso',code:'BF'},{name:'Burundi',code:'BI'},{name:'Cambodia',code:'KH'},{name:'Cameroon',code:'CM'},{name:'Canada',code:'CA'},{name:'Cape Verde',code:'CV'},{name:'Cayman Islands',code:'KY'},{name:'Central African Republic',code:'CF'},{name:'Chad',code:'TD'},{name:'Chile',code:'CL'},{name:'China',code:'CN'},{name:'Christmas Island',code:'CX'},{name:'Cocos(Keeling)Islands',code:'CC'},{name:'Colombia',code:'CO'},{name:'Comoros',code:'KM'},{name:'Congo',code:'CG'},{name:'Congo,The Democratic Republic of the',code:'CD'},{name:'Cook Islands',code:'CK'},{name:'Costa Rica',code:'CR'},{name:'CoteD\'Ivoire',code:'CI'},{name:'Croatia',code:'HR'},{name:'Cuba',code:'CU'},{name:'Cyprus',code:'CY'},{name:'Czech Republic',code:'CZ'},{name:'Denmark',code:'DK'},{name:'Djibouti',code:'DJ'},{name:'Dominica',code:'DM'},{name:'Dominican Republic',code:'DO'},{name:'Ecuador',code:'EC'},{name:'Egypt',code:'EG'},{name:'El Salvador',code:'SV'},{name:'Equatorial Guinea',code:'GQ'},{name:'Eritrea',code:'ER'},{name:'Estonia',code:'EE'},{name:'Ethiopia',code:'ET'},{name:'Falkland Islands(Malvinas)',code:'FK'},{name:'Faroe Islands',code:'FO'},{name:'Fiji',code:'FJ'},{name:'Finland',code:'FI'},{name:'France',code:'FR'},{name:'French Guiana',code:'GF'},{name:'French Polynesia',code:'PF'},{name:'French Southern Territories',code:'TF'},{name:'Gabon',code:'GA'},{name:'Gambia',code:'GM'},{name:'Georgia',code:'GE'},{name:'Germany',code:'DE'},{name:'Ghana',code:'GH'},{name:'Gibraltar',code:'GI'},{name:'Greece',code:'GR'},{name:'Greenland',code:'GL'},{name:'Grenada',code:'GD'},{name:'Guadeloupe',code:'GP'},{name:'Guam',code:'GU'},{name:'Guatemala',code:'GT'},{name:'Guernsey',code:'GG'},{name:'Guinea',code:'GN'},{name:'Guinea-Bissau',code:'GW'},{name:'Guyana',code:'GY'},{name:'Haiti',code:'HT'},{name:'Heard Island and Mcdonald Islands',code:'HM'},{name:'Holy See(Vatican City State)',code:'VA'},{name:'Honduras',code:'HN'},{name:'Hong Kong',code:'HK'},{name:'Hungary',code:'HU'},{name:'Iceland',code:'IS'},{name:'India',code:'IN'},{name:'Indonesia',code:'ID'},{name:'Iran, Islamic Republic Of',code:'IR'},{name:'Iraq',code:'IQ'},{name:'Ireland',code:'IE'},{name:'Isle of Man',code:'IM'},{name:'Israel',code:'IL'},{name:'Italy',code:'IT'},{name:'Jamaica',code:'JM'},{name:'Japan',code:'JP'},{name:'Jersey',code:'JE'},{name:'Jordan',code:'JO'},{name:'Kazakhstan',code:'KZ'},{name:'Kenya',code:'KE'},{name:'Kiribati',code:'KI'},{name:'Korea,Democratic People Republic of',code:'KP'},{name:'Korea, Republic of',code:'KR'},{name:'Kuwait',code:'KW'},{name:'Kyrgyzstan',code:'KG'},{name:'Lao People Democratic Republic',code:'LA'},{name:'Latvia',code:'LV'},{name:'Lebanon',code:'LB'},{name:'Lesotho',code:'LS'},{name:'Liberia',code:'LR'},{name:'Libyan Arab Jamahiriya',code:'LY'},{name:'Liechtenstein',code:'LI'},{name:'Lithuania',code:'LT'},{name:'Luxembourg',code:'LU'},{name:'Macao',code:'MO'},{name:'Macedonia,The Former Yugoslav Republic of',code:'MK'},{name:'Madagascar',code:'MG'},{name:'Malawi',code:'MW'},{name:'Malaysia',code:'MY'},{name:'Maldives',code:'MV'},{name:'Mali',code:'ML'},{name:'Malta',code:'MT'},{name:'Marshall Islands',code:'MH'},{name:'Martinique',code:'MQ'},{name:'Mauritania',code:'MR'},{name:'Mauritius',code:'MU'},{name:'Mayotte',code:'YT'},{name:'Mexico',code:'MX'},{name:'Micronesia, Federated States of',code:'FM'},{name:'Moldova, Republic of',code:'MD'},{name:'Monaco',code:'MC'},{name:'Mongolia',code:'MN'},{name:'Montserrat',code:'MS'},{name:'Morocco',code:'MA'},{name:'Mozambique',code:'MZ'},{name:'Myanmar',code:'MM'},{name:'Namibia',code:'NA'},{name:'Nauru',code:'NR'},{name:'Nepal',code:'NP'},{name:'Netherlands',code:'NL'},{name:'Netherlands Antilles',code:'AN'},{name:'New Caledonia',code:'NC'},{name:'New Zealand',code:'NZ'},{name:'Nicaragua',code:'NI'},{name:'Niger',code:'NE'},{name:'Nigeria',code:'NG'},{name:'Niue',code:'NU'},{name:'Norfolk Island',code:'NF'},{name:'Northern Mariana Islands',code:'MP'},{name:'Norway',code:'NO'},{name:'Oman',code:'OM'},{name:'Pakistan',code:'PK'},{name:'Palau',code:'PW'},{name:'Palestinian Territory, Occupied',code:'PS'},{name:'Panama',code:'PA'},{name:'Papua New Guinea',code:'PG'},{name:'Paraguay',code:'PY'},{name:'Peru',code:'PE'},{name:'Philippines',code:'PH'},{name:'Pitcairn',code:'PN'},{name:'Poland',code:'PL'},{name:'Portugal',code:'PT'},{name:'Puerto Rico',code:'PR'},{name:'Qatar',code:'QA'},{name:'Reunion',code:'RE'},{name:'Romania',code:'RO'},{name:'Russian Federation',code:'RU'},{name:'RWANDA',code:'RW'},{name:'SaintHelena',code:'SH'},{name:'Saint Kitts and Nevis',code:'KN'},{name:'SaintLucia',code:'LC'},{name:'Saint Pierre and Miquelon',code:'PM'},{name:'Saint Vincent and the Grenadines',code:'VC'},{name:'Samoa',code:'WS'},{name:'SanMarino',code:'SM'},{name:'Sao Tome and Principe',code:'ST'},{name:'Saudi Arabia',code:'SA'},{name:'Senegal',code:'SN'},{name:'Serbia and Montenegro',code:'CS'},{name:'Seychelles',code:'SC'},{name:'Sierra Leone',code:'SL'},{name:'Singapore',code:'SG'},{name:'Slovakia',code:'SK'},{name:'Slovenia',code:'SI'},{name:'Solomon Islands',code:'SB'},{name:'Somalia',code:'SO'},{name:'SouthAfrica',code:'ZA'},{name:'South Georgia and the South Sandwich Islands',code:'GS'},{name:'Spain',code:'ES'},{name:'SriLanka',code:'LK'},{name:'Sudan',code:'SD'},{name:'Suriname',code:'SR'},{name:'Svalbard and JanMayen',code:'SJ'},{name:'Swaziland',code:'SZ'},{name:'Sweden',code:'SE'},{name:'Switzerland',code:'CH'},{name:'Syrian Arab Republic',code:'SY'},{name:'Taiwan, Province of China',code:'TW'},{name:'Tajikistan',code:'TJ'},{name:'Tanzania, United Republic of',code:'TZ'},{name:'Thailand',code:'TH'},{name:'Timor-Leste',code:'TL'},{name:'Togo',code:'TG'},{name:'Tokelau',code:'TK'},{name:'Tonga',code:'TO'},{name:'Trinidad and Tobago',code:'TT'},{name:'Tunisia',code:'TN'},{name:'Turkey',code:'TR'},{name:'Turkmenistan',code:'TM'},{name:'Turks and Caicos Islands',code:'TC'},{name:'Tuvalu',code:'TV'},{name:'Uganda',code:'UG'},{name:'Ukraine',code:'UA'},{name:'United Arab Emirates',code:'AE'},{name:'United Kingdom',code:'GB'},{name:'United States',code:'US'},{name:'United States Minor Outlying Islands',code:'UM'},{name:'Uruguay',code:'UY'},{name:'Uzbekistan',code:'UZ'},{name:'Vanuatu',code:'VU'},{name:'Venezuela',code:'VE'},{name:'VietNam',code:'VN'},{name:'Virgin Islands, British',code:'VG'},{name:'Virgin Islands, U.S.',code:'VI'},{name:'Wallis and Futuna',code:'WF'},{name:'Western Sahara',code:'EH'},{name:'Yemen',code:'YE'},{name:'Zambia',code:'ZM'},{name:'Zimbabwe',code:'ZW'}]
function _parseOptions(options) {
    userRecord = {
        _Memb_Id: parseInt(options['0']._Memb_Id),
        _Supervisor: options['1']._Supervisor,
        Rep_Id: parseInt(options['2'].Rep_Id),
        reprstat: options['3'].reprstat,
        Salutation: options['4'].Salutation,
        FirstName: options['5'].FirstName,
        MiddleInitial: options['6'].MiddleInitial,
        LastName: options['7'].LastName,
        PerferredName: options['14'].PerferredName,
        Title: options['15'].Title,
        Position: options['16'].Position,
        Formal_Greeting: options['19'].Formal_Greeting,
        Informal_Greeting: options['20'].Informal_Greeting,
        twitter: options['43'].twitter,
        facebook: options['44'].facebook,
        linkedin: options['45'].linkedin,
        myspace: options['46'].myspace,
        youtube: options['47'].youtube,
        googleplus: options['48'].googleplus,
        Username: options['53'].Username,
        Password: options['54'].Password,
        Email_Id: parseInt(options['56'].Email_Id),
        Email_Address: options['79'].Email[1].Email_Address,
        Phone1_Id: parseInt(options['59'].Phone1_Id),
        Phone1: options['80'].Phone1[6].Phone,
        Extension1: options['80'].Phone1[3].Extension,
        Phone2_Id: parseInt(options['60'].Phone2_Id),
        Phone2: options['81'].Phone2[6].Phone,
        Extension2: options['81'].Phone2[3].Extension,
        Fax_Id: parseInt(options['61'].Fax_Id),
        Fax: options['82'].Fax[6].Phone,
        MailAddr_Id: parseInt(options['57'].MailAddr_Id),
        City: options['83'].MailingAddress[3].City,
        State: options['83'].MailingAddress[4].State,
        Zip: options['83'].MailingAddress[9].Zip,
        Country: options['83'].MailingAddress[5].Country,
        Address1: options['83'].MailingAddress[1].Address1,
        Address2: options['83'].MailingAddress[2].Address2,
        OtherAddr_Id: parseInt(options['58'].OtherAddr_Id),
        City_OA: options['84'].OtherAddress[3].City,
        State_OA: options['84'].OtherAddress[4].State,
        Zip_OA: options['84'].OtherAddress[9].Zip,
        Country_OA: options['84'].OtherAddress[5].Country,
        Address1_OA: options['84'].OtherAddress[1].Address1,
        Address2_OA: options['84'].OtherAddress[2].Address2,
    }
    if (userRecord.OtherAddr_Id > 0) {
        userRecord.hasOtherAddress = true
    } else { userRecord.hasOtherAddress = false }
    return userRecord
}

module.exports = function userEditRouteFn( app ) {

    return function userEditRoute( req, res ) {
        user = req.session.user

        var audience = req.session.audience
        audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience

        if (req.session.user == undefined) {
            res.render('user-edit',{
                layout: 'main',
                message: 'You need to be logged in to see this content.',
                error: true
            })
            return
        }
        app.sba.call({
            method: 'GetIndividualInfo',
            params: {
                intRep_Id: user.intRepID
            }
        }).then((callResponse) => {
            options = FormatSbaDataset(
                callResponse,
                'data.GetIndividualInfoResponse'
            )
            options = _parseOptions(options)
            res.render('user-edit', {
                layout: 'static',
                profile: options,
                states: _states,
                countries: _countries,
                audience: audience,
                audienceSlug: AudienceSlugs.toSlug(audience),
            })
        }).catch(HandleErrorsFn( req, res ));
    }
}