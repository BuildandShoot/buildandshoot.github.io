function httpsify(str) {
    if (location.protocol == 'https:')
        return str.replace(new RegExp("http:", 'g'), "https:");
    return str;
}

function getip(callback) {
    $.ajax({
        type: "GET",
        url: httpsify('http://services.buildandshoot.com/getip'),
        async: true,
        success: function(data, textStatus, xhr) {
            return callback(data); 
        },
    });
}

function stringEquals(a, b) {
    return a.toLowerCase() == b.toLowerCase();
}

function stringContainsAny(str, arr) {
    for(var i = 0; i < arr.length; i++)
        if (stringContains(str, arr[i]))
            return true;
    return false;
}

function stringContains(needle, haystack) {
    return haystack.toLowerCase().indexOf(needle.toLowerCase()) >= 0;
}

function arrayContains(needle, haystack) {
    for(var i = 0; i < haystack.length; i++)
        if(haystack[i].toLowerCase() === needle.toLowerCase())
            return true;
    return false;
}

function modifyAdContainers() {
    $("div[data-adblock-class]").each(function(index) {
        $(this).attr("class", $(this).attr("data-adblock-class"));
    });
}

function isIP(str) {
    var octets = str.split('.');

    if (octets.length != 4)
        return false;

    for(var i = 0; i < octets.length; i++) {
        var octet = octets[i];
        if (octet < 0 || octet > 255)
            return false;
    }

   return true;
}

function isValidPort(port) {
    return Number.IsNumber(port) && port >= 0 && port <= 65535;
}

function ip2aos(address, version) {

    var split = address.split(':');
    var ip = split[0];

    if (!isIP(ip))
        return false;

    if (split.length > 1 && !isValidPort(split[1]))
        return false;

    var port = split.length > 1 ? split[1] : 32887;

    var octets = ip.split('.');
    var identifier = parseInt(octets[3]) * 0x1000000 + parseInt(octets[2]) * 0x10000 + parseInt(octets[1]) * 0x100 + parseInt(octets[0]);
    var url = "aos://" + identifier + ":" + port;

    if (version != null)
        url += ":" + version;
    return url;
}

var gameVersions = ["0.1", "0.2", "0.21", "0.22", "0.25", "0.26", "0.3", "0.31", "0.32", "0.33", "0.35", "0.36", "0.4", "0.41", "0.42", "0.45", "0.46", "0.47", "0.48", "0.49", "0.5", "0.51", "0.52", "0.53", "0.54", "0.58", "0.6", "0.61", "0.62", "0.7", "0.75", "0.76"];

var isoCountries = {
    'AF' : 'Afghanistan',
    'AX' : 'Aland Islands',
    'AL' : 'Albania',
    'DZ' : 'Algeria',
    'AS' : 'American Samoa',
    'AD' : 'Andorra',
    'AO' : 'Angola',
    'AI' : 'Anguilla',
    'AQ' : 'Antarctica',
    'AG' : 'Antigua And Barbuda',
    'AR' : 'Argentina',
    'AM' : 'Armenia',
    'AW' : 'Aruba',
    'AU' : 'Australia',
    'AT' : 'Austria',
    'AZ' : 'Azerbaijan',
    'BS' : 'Bahamas',
    'BH' : 'Bahrain',
    'BD' : 'Bangladesh',
    'BB' : 'Barbados',
    'BY' : 'Belarus',
    'BE' : 'Belgium',
    'BZ' : 'Belize',
    'BJ' : 'Benin',
    'BM' : 'Bermuda',
    'BT' : 'Bhutan',
    'BO' : 'Bolivia',
    'BA' : 'Bosnia And Herzegovina',
    'BW' : 'Botswana',
    'BV' : 'Bouvet Island',
    'BR' : 'Brazil',
    'IO' : 'British Indian Ocean Territory',
    'BN' : 'Brunei Darussalam',
    'BG' : 'Bulgaria',
    'BF' : 'Burkina Faso',
    'BI' : 'Burundi',
    'KH' : 'Cambodia',
    'CM' : 'Cameroon',
    'CA' : 'Canada',
    'CV' : 'Cape Verde',
    'KY' : 'Cayman Islands',
    'CF' : 'Central African Republic',
    'TD' : 'Chad',
    'CL' : 'Chile',
    'CN' : 'China',
    'CX' : 'Christmas Island',
    'CC' : 'Cocos (Keeling) Islands',
    'CO' : 'Colombia',
    'KM' : 'Comoros',
    'CG' : 'Congo',
    'CD' : 'Congo, Democratic Republic',
    'CK' : 'Cook Islands',
    'CR' : 'Costa Rica',
    'CI' : 'Cote D\'Ivoire',
    'HR' : 'Croatia',
    'CU' : 'Cuba',
    'CY' : 'Cyprus',
    'CZ' : 'Czech Republic',
    'DK' : 'Denmark',
    'DJ' : 'Djibouti',
    'DM' : 'Dominica',
    'DO' : 'Dominican Republic',
    'EC' : 'Ecuador',
    'EG' : 'Egypt',
    'SV' : 'El Salvador',
    'GQ' : 'Equatorial Guinea',
    'ER' : 'Eritrea',
    'EE' : 'Estonia',
    'ET' : 'Ethiopia',
    'FK' : 'Falkland Islands (Malvinas)',
    'FO' : 'Faroe Islands',
    'FJ' : 'Fiji',
    'FI' : 'Finland',
    'FR' : 'France',
    'GF' : 'French Guiana',
    'PF' : 'French Polynesia',
    'TF' : 'French Southern Territories',
    'GA' : 'Gabon',
    'GM' : 'Gambia',
    'GE' : 'Georgia',
    'DE' : 'Germany',
    'GH' : 'Ghana',
    'GI' : 'Gibraltar',
    'GR' : 'Greece',
    'GL' : 'Greenland',
    'GD' : 'Grenada',
    'GP' : 'Guadeloupe',
    'GU' : 'Guam',
    'GT' : 'Guatemala',
    'GG' : 'Guernsey',
    'GN' : 'Guinea',
    'GW' : 'Guinea-Bissau',
    'GY' : 'Guyana',
    'HT' : 'Haiti',
    'HM' : 'Heard Island & Mcdonald Islands',
    'VA' : 'Holy See (Vatican City State)',
    'HN' : 'Honduras',
    'HK' : 'Hong Kong',
    'HU' : 'Hungary',
    'IS' : 'Iceland',
    'IN' : 'India',
    'ID' : 'Indonesia',
    'IR' : 'Iran, Islamic Republic Of',
    'IQ' : 'Iraq',
    'IE' : 'Ireland',
    'IM' : 'Isle Of Man',
    'IL' : 'Israel',
    'IT' : 'Italy',
    'JM' : 'Jamaica',
    'JP' : 'Japan',
    'JE' : 'Jersey',
    'JO' : 'Jordan',
    'KZ' : 'Kazakhstan',
    'KE' : 'Kenya',
    'KI' : 'Kiribati',
    'KR' : 'Korea',
    'KW' : 'Kuwait',
    'KG' : 'Kyrgyzstan',
    'LA' : 'Lao People\'s Democratic Republic',
    'LV' : 'Latvia',
    'LB' : 'Lebanon',
    'LS' : 'Lesotho',
    'LR' : 'Liberia',
    'LY' : 'Libyan Arab Jamahiriya',
    'LI' : 'Liechtenstein',
    'LT' : 'Lithuania',
    'LU' : 'Luxembourg',
    'MO' : 'Macao',
    'MK' : 'Macedonia',
    'MG' : 'Madagascar',
    'MW' : 'Malawi',
    'MY' : 'Malaysia',
    'MV' : 'Maldives',
    'ML' : 'Mali',
    'MT' : 'Malta',
    'MH' : 'Marshall Islands',
    'MQ' : 'Martinique',
    'MR' : 'Mauritania',
    'MU' : 'Mauritius',
    'YT' : 'Mayotte',
    'MX' : 'Mexico',
    'FM' : 'Micronesia, Federated States Of',
    'MD' : 'Moldova',
    'MC' : 'Monaco',
    'MN' : 'Mongolia',
    'ME' : 'Montenegro',
    'MS' : 'Montserrat',
    'MA' : 'Morocco',
    'MZ' : 'Mozambique',
    'MM' : 'Myanmar',
    'NA' : 'Namibia',
    'NR' : 'Nauru',
    'NP' : 'Nepal',
    'NL' : 'Netherlands',
    'AN' : 'Netherlands Antilles',
    'NC' : 'New Caledonia',
    'NZ' : 'New Zealand',
    'NI' : 'Nicaragua',
    'NE' : 'Niger',
    'NG' : 'Nigeria',
    'NU' : 'Niue',
    'NF' : 'Norfolk Island',
    'MP' : 'Northern Mariana Islands',
    'NO' : 'Norway',
    'OM' : 'Oman',
    'PK' : 'Pakistan',
    'PW' : 'Palau',
    'PS' : 'Palestinian Territory, Occupied',
    'PA' : 'Panama',
    'PG' : 'Papua New Guinea',
    'PY' : 'Paraguay',
    'PE' : 'Peru',
    'PH' : 'Philippines',
    'PN' : 'Pitcairn',
    'PL' : 'Poland',
    'PT' : 'Portugal',
    'PR' : 'Puerto Rico',
    'QA' : 'Qatar',
    'RE' : 'Reunion',
    'RO' : 'Romania',
    'RU' : 'Russian Federation',
    'RW' : 'Rwanda',
    'BL' : 'Saint Barthelemy',
    'SH' : 'Saint Helena',
    'KN' : 'Saint Kitts And Nevis',
    'LC' : 'Saint Lucia',
    'MF' : 'Saint Martin',
    'PM' : 'Saint Pierre And Miquelon',
    'VC' : 'Saint Vincent And Grenadines',
    'WS' : 'Samoa',
    'SM' : 'San Marino',
    'ST' : 'Sao Tome And Principe',
    'SA' : 'Saudi Arabia',
    'SN' : 'Senegal',
    'RS' : 'Serbia',
    'SC' : 'Seychelles',
    'SL' : 'Sierra Leone',
    'SG' : 'Singapore',
    'SK' : 'Slovakia',
    'SI' : 'Slovenia',
    'SB' : 'Solomon Islands',
    'SO' : 'Somalia',
    'ZA' : 'South Africa',
    'GS' : 'South Georgia And Sandwich Isl.',
    'ES' : 'Spain',
    'LK' : 'Sri Lanka',
    'SD' : 'Sudan',
    'SR' : 'Suriname',
    'SJ' : 'Svalbard And Jan Mayen',
    'SZ' : 'Swaziland',
    'SE' : 'Sweden',
    'CH' : 'Switzerland',
    'SY' : 'Syrian Arab Republic',
    'TW' : 'Taiwan',
    'TJ' : 'Tajikistan',
    'TZ' : 'Tanzania',
    'TH' : 'Thailand',
    'TL' : 'Timor-Leste',
    'TG' : 'Togo',
    'TK' : 'Tokelau',
    'TO' : 'Tonga',
    'TT' : 'Trinidad And Tobago',
    'TN' : 'Tunisia',
    'TR' : 'Turkey',
    'TM' : 'Turkmenistan',
    'TC' : 'Turks And Caicos Islands',
    'TV' : 'Tuvalu',
    'UG' : 'Uganda',
    'UA' : 'Ukraine',
    'AE' : 'United Arab Emirates',
    'GB' : 'United Kingdom',
    'US' : 'United States',
    'UM' : 'United States Outlying Islands',
    'UY' : 'Uruguay',
    'UZ' : 'Uzbekistan',
    'VU' : 'Vanuatu',
    'VE' : 'Venezuela',
    'VN' : 'Viet Nam',
    'VG' : 'Virgin Islands, British',
    'VI' : 'Virgin Islands, U.S.',
    'WF' : 'Wallis And Futuna',
    'EH' : 'Western Sahara',
    'YE' : 'Yemen',
    'ZM' : 'Zambia',
    'ZW' : 'Zimbabwe'
};

function getCountryName (countryCode) {
    var countryCode = countryCode.toUpperCase();
    if (isoCountries.hasOwnProperty(countryCode)) {
        return isoCountries[countryCode];
    } else {
        return countryCode;
    }
}

var PLATFORM = {
    WINDOWS : {value: 0, name: "Windows", fontawesome: "windows"}, 
    OSX : {value: 1, name: "OSX", fontawesome: "apple"},  
    LINUX : {value: 2, name: "Linux", fontawesome: "linux"}, 
};

function Release(name, version, updated, platform, url) {
    this.name = name;
    this.version = version;
    this.updated = updated;
    this.platform = platform;
    this.url = url;
}

function getLauncherReleases(callback, tag) {
    var releases = [];

    $.get(httpsify('http://launcher.buildandshoot.com/update?json=true'), function (response) {
        for(var i = 0; i < response.length; i++) {    
            var update = response[i];
            if (update.url.endsWith(".exe")) {
                var release = new Release("Build and Shoot Launcher", "v" + update.version, update.published, PLATFORM.WINDOWS, update.url);
                releases.push(release); 
            }
        }

        return callback(releases, tag); 
    });
}

function getOpenspadesReleases(callback, tag) {
    var releases = [];

    $.get('https://api.github.com/repos/yvt/openspades/releases/latest', function (response) {
        var version = response.tag_name;

        for(var i = 0; i < response.assets.length; i++) {
            var asset = response.assets[i];
            
            if (asset.content_type == "application/zip") {

                var platform;

                if (asset.name.match(/osx/i)) {
                    platform = PLATFORM.OSX;
                }
                else if (asset.name.match(/windows/i)) {
                    platform = PLATFORM.WINDOWS;
                }

                var release = new Release(asset.name, version, asset.created_at, platform, asset.browser_download_url);
                releases.push(release);
            }
        }

        return callback(releases, tag);
    });
}

function getPysnipReleases(callback, tag) {
    var releases = [];

    $.get('https://api.github.com/repos/NateShoffner/PySnip/releases', function (response) {

        var linux = [];

        for(var i = 0; i < 2; i++) {

            var release = response[i];

            var asset = release.assets[0];

            var split = release.tag_name.split("-");
            var version = split[0] + " (rev. " + split[2] + ")";

            if (asset.content_type == "application/zip") {

                var release = new Release(asset.name, version, asset.created_at, PLATFORM.WINDOWS, asset.browser_download_url);
                releases.push(release);

                var linuxZipball = new Release(asset.name, version, asset.created_at, PLATFORM.LINUX, release.zipball_url);
                releases.push(linuxZipball);
            }
        }

        return callback(releases, tag);
    });
}

function getVoxlapReleases(callback, tag) {
    var releases = [];

    $.get(httpsify('http://services.buildandshoot.com/game_mirrors'), function (response) {

        for(var i = 0; i < response.length; i++) {

            var mirror = response[i];

            if (mirror.format == "msi") {
                var release = new Release("Voxlap", "v" + mirror.version, "N/A", PLATFORM.WINDOWS, mirror.url);
                releases.push(release);
            }
        }

        return callback(releases, tag);
    });
}