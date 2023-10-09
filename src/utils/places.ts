const places = [
  'Madrid',
  'Haifa',
  'London',
  'New York',
  'Paris',
  'Tokyo',
  'Beijing',
  'Sydney',
  'Rio de Janeiro',
  'Dubai',
  'Los Angeles',
  'Mumbai',
  'Moscow',
  'Berlin',
  'Toronto',
  'Cairo',
  'Buenos Aires',
  'Istanbul',
  'Rome',
  'Seoul',
  'Bangkok',
  'Cape Town',
  'San Francisco',
  'Amsterdam',
  'Lisbon',
  'Vienna',
  'Singapore',
  'Mexico City',
  'Hanoi',
  'Stockholm',
  'New Delhi',
  'Chicago',
  'San Paulo',
  'Shanghai',
  'Hong Kong',
  'Barcelona',
  'Athens',
  'Dublin',
  'Zurich',
  'Warsaw',
  'Prague',
  'Johannesburg',
  'Helsinki',
  'Budapest',
  'Oslo',
  'Copenhagen',
  'Edinburgh',
  'Kuala Lumpur',
  'Manila',
  'Lima',
  'Brussels',
  'Geneva',
  'Montreal',
  'Vancouver',
  'Seattle',
  'Miami',
  'Dallas',
  'Atlanta',
  'Denver',
  'Phoenix',
  'Las Vegas',
  'Houston',
  'Philadelphia',
  'Boston',
  'Washington D.C.',
  'San Diego',
  'Orlando',
  'Austin',
  'Nairobi',
  'Doha',
  'Kuwait City',
  'Abu Dhabi',
  'Manama',
  'Muscat',
  'Jeddah',
  'Belfast',
  'Cardiff',
  'Glasgow',
  'Manchester',
  'Birmingham',
  'Leeds',
  'Sheffield',
  'Newcastle',
  'Liverpool',
  'Nottingham',
  'Leicester',
  'Bristol',
  'Southampton',
  'Portsmouth',
  'Plymouth',
  'Bournemouth',
  'Cambridge',
  'Oxford',
  'Brighton',
  'Coventry',
  'Derby',
  'Stoke-on-Trent',
  'Luton',
  'Milton Keynes',
  'Norwich',
  'Ipswich',
  'Peterborough',
  'Northampton',
  'Swindon',
  'Reading',
  'Slough',
  'Windsor',
  'Woking',
  'Cork',
  'Galway',
  'Limerick',
  'Belfast',
  'Lisburn',
  'Derry',
  'Newry',
  'Bangor',
  'Craigavon',
  'Londonderry',
  'Ballymena',
  'Newtownabbey',
  'Carrickfergus',
  'Newtownards',
  'Coleraine',
  'Larne',
  'Banbridge',
  'Antrim',
  'Enniskillen',
  'Strabane',
  'Holywood',
  'Limavady',
  'Dungannon',
  'Cookstown',
  'Downpatrick',
  'Ballymoney',
  'Comber',
  'Kilkeel',
  'Warrenpoint',
  'Rostrevor',
  'Donaghadee',
  'Ballyclare',
  'Magherafelt',
  'Portstewart',
  'Carryduff',
  'Portrush',
  'Ballynahinch',
  'Greenisland',
  'Ballycastle',
  'Crumlin',
  'Randalstown',
  'Moira',
  'Killyleagh',
  'Whitehead',
  'Eglinton',
  'Coalisland',
  'Dromore',
  'Ballygowan',
  'Castlederg',
  'Glenavy',
  'Crossmaglen',
  'Sion Mills',
  'Draperstown',
  'Maghera',
  'Carnlough',
  'Castlerock',
  'Fintona',
  'Armagh',
  'Portglenone',
  'Broughshane',
  'Claudy',
  'Gortin',
  'Dunloy',
  'Aughnacloy',
  'Cullybackey',
  'Strathfoyle',
  'Dunmurry',
  'Richhill',
  'Tandragee',
  'Coagh',
  'Dervock',
  'Cushendall',
  'Ballykelly',
  'Ederney',
  'Keady',
  'Strangford',
  'Dundrum',
  'Millisle',
  'Carnmoney',
  'Poyntzpass',
  'Ballinderry Upper',
  'Castlecaulfield',
  'Glenoe',
  'Newbuildings',
  'Gilford',
  'Portaferry',
  'Irvinestown',
  'Ballynahinch',
  'Greenisland',
  'Ballycastle',
  'Crumlin',
  'Randalstown',
  'Moira',
  'Killyleagh',
  'Whitehead',
  'Coagh',
  'Dervock',
  'Cushendall',
  'Ballykelly',
  'Ederney',
  'Keady',
  'Strangford',
  'Millisle',
  'Ballinderry Upper',
  'Castlecaulfield',
  'Gilford',
  'Portaferry',
  'Irvinestown',
  'Randalstown',
  'Killyleagh',
  'Coagh',
  'Dervock',
  'Millisle',
  'Ballinderry Upper',
  'Castlecaulfield',
  'Gilford',
  'Portaferry',
  'Killyleagh',
  'Coagh',
  'Millisle',
  'Ballinderry Upper',
  'Castlecaulfield',
  'Gilford',
  'Portaferry',
  'Killyleagh',
  'Millisle',
  'Ballinderry Upper',
  'Castlecaulfield',
  'Gilford',
  'Portaferry',
  'Killyleagh',
  'Millisle',
  'Ballinderry Upper',
  'Castlecaulfield',
  'Gilford',
  'Portaferry',
  'Killyleagh',
  'Millisle',
  'Ballinderry Upper',
  'Castlecaulfield',
  'Gilford',
  'Portaferry',
  'Killyleagh',
  'Millisle',
  'Ballinderry Upper',
  'Castlecaulfield',
  'Gilford',
  'Portaferry',
  'Killyleagh',
  'Millisle',
  'Ballinderry Upper',
  'Castlecaulfield',
  'Gilford',
  'Portaferry',
  'Killyleagh',
  'Millisle',
  'Ballinderry Upper',
  'Castlecaulfield',
  'Gilford',
  'Portaferry',
  'Killyleagh',
  'Millisle',
  'Ballinderry Upper',
  'Castlecaulfield',
  'Gilford',
  'Portaferry',
  'Killyleagh',
  'Millisle',
  'Ballinderry Upper',
  'Castlecaulfield',
  'Gilford',
  'Portaferry',
  'Killyleagh',
  'Millisle',
  'Ballinderry Upper',
  'Castlecaulfield',
  'Gilford',
  'Portaferry',
  'Killyleagh',
  'Millisle',
  'Ballinderry Upper',
  'Castlecaulfield',
  'Gilford',
  'Portaferry',
  'Killyleagh',
  'Millisle',
  'Ballinderry Upper',
  'Castlecaulfield',
  'Gilford',
  'Portaferry',
  'Killyleagh',
  'Millisle',
  'Ballinderry Upper',
  'Castlecaulfield',
  'Gilford',
  'Portaferry',
  'Killyleagh',
  'Millisle',
  'Ballinderry Upper',
];

export default places;