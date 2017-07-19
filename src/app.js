const {
  Button, Action, TextView, TextInput, Picker, Page, ScrollView, AlertDialog, WebView, ui
} = require('tabris');

const MOS = ['MOS1', 'MOS2', 'MOS3', 'MOS4'];
const BJT = ['BJT1', 'BJT2', 'BJT3'];

var mosPage;
var mosMessage;
var bjtPage;
var bjtMessage;

var navigationView = new tabris.NavigationView({
  left: 0, top: 0, right: 0, bottom: 0
}).appendTo(tabris.ui.contentView);

//Създаване и наименоване на началната страница
var mainPage = new tabris.Page({
  title: 'RLab'
}).appendTo(navigationView);

//Създване на Action за настройките
new tabris.Action({
  id: 'settingsToggler',
  title: 'Settings',
  placementPriority: 'high',
  image: {
  src: tabris.device.platform === 'iOS' ? 'images/settings-black-24dp@3x.png' : 'images/settings-white-24dp@3x.png',
  scale: 3
}

}).on('select', () => createSettingsPage().appendTo(navigationView))
  .appendTo(navigationView);

//Създаване на TextView за избор на транзистор
new tabris.TextView({
  id: 'chooseTransistorLabel',
  alignment: 'center',
  font: "bold 20px",
  background: '#8b0000',
  textColor: 'white',
  text: 'Изберете вида на транзистора:'
  }).appendTo(mainPage);

//Създаване на бутон за измерване на параметрите на биполярен транзистор
new tabris.Button({
  id: 'bjtButton',
  text: 'Биполярен транзистор',
  background: '#8b0000',
  textColor: 'white'
}).on('select', function() {
  createBjtPage();
}).appendTo(mainPage);

//Създаване на бутон за измерване на параметрите на MOS транзистор
new tabris.Button({
  id: 'mosButton',
  text: 'MOS транзистор',
  background: '#8b0000',
  textColor: 'white'
}).on('select', function() {
 createMosPage();
}).appendTo(mainPage);

mainPage.apply({
  '#chooseTransistorLabel': {left: 255, top: 380, width: 320},
  '#bjtButton': {left: 10, right: 10, top: '#chooseTransistorLabel 18'},
  '#mosButton': {left: 10, right: 10, top: '#bjtButton 18'}
});

//Функция за създаване на страница за измерване на параметрите на MOS транзистор
function createMosPage() {

 //Създаване и наименоване на страница за MOS транзистор
 mosPage = new tabris.Page({
   title: 'MOS транзистор'
 }).appendTo(navigationView);

 //Създаване на TextView и TextInput за име
 new tabris.TextView({
   id: 'nameMosLabel',
   alignment: 'left',
   text: 'Име:'
 }).appendTo(mosPage);

 new tabris.TextInput({
   id: 'nameMosInput',
   message: 'Трите имена на студента'
 }).appendTo(mosPage);

 //Създаване на TextView и TextInput за факултетен номер
 new tabris.TextView({
   id: 'facultyNumberMosLabel',
   text: 'Факултетен номер:'
 }).appendTo(mosPage);

 new tabris.TextInput({
   id: 'facultyNumberMosInput',
   keyboard: 'number',
   message: 'Факултетен номер'
 }).appendTo(mosPage);

 //Създаване на TextView и TextInput за група
 new tabris.TextView({
   id: 'groupMosLabel',
   text: 'Група:'
 }).appendTo(mosPage);

 new tabris.TextInput({
   id: 'groupNumberMosInput',
   keyboard: 'number',
   message: 'Група'
 }).appendTo(mosPage);

 //Създаване на TextView и Picker за избор на MOS транзистор
 new tabris.TextView({
   id: 'transistorMosLabel',
   text: 'Изберете транзистор:'
 }).appendTo(mosPage);

 new tabris.Picker({
   id: 'transistorMosPicker',
   itemCount: MOS.length,
   itemText: (index) => MOS[index],
   selectionIndex: 0
 }).appendTo(mosPage);

 //Създаване на входни данни за Uds
  new tabris.TextView({
    id: 'UdsLabel',
    text: 'Uds, V'
  }).appendTo(mosPage);

  //Създаване на TextView и TextInput за начална стойност за Uds
  new tabris.TextView({
    id: 'UdsStartValueLabel',
    text: 'Начална стойност:'
  }).appendTo(mosPage);

  new tabris.TextInput({
    id: 'UdsStartValueInput',
    keyboard: 'number',
    message: 'Въведете начална стойност за Uds'
  }).appendTo(mosPage);

  //Създаване на TextView и TextInput за крайна стойност за Uds
  new tabris.TextView({
    id: 'UdsEndValueLabel',
    text: 'Крайна стойност:'
  }).appendTo(mosPage);

  new tabris.TextInput({
    id: 'UdsEndValueInput',
    keyboard: 'number',
    message: 'Въведете крайна стойност за Uds'
  }).appendTo(mosPage);

  //Създаване на входни данни за Ugs
   new tabris.TextView({
     id: 'UgsLabel',
     text: 'Ugs'
   }).appendTo(mosPage);

   //Създаване на TextView и TextInput за стойност 1
   new tabris.TextView({
     id: 'UgsValue1Label',
     text: 'Стойност 1:'
   }).appendTo(mosPage);

   new tabris.TextInput({
     id: 'UgsValue1Input',
     keyboard: 'number',
     message: 'Въведете стойност 1'
   }).appendTo(mosPage);

   //Създаване на TextView и TextInput за стойност 2
   new tabris.TextView({
     id: 'UgsValue2Label',
     text: 'Стойност 2:'
   }).appendTo(mosPage);

   new tabris.TextInput({
     id: 'UgsValue2Input',
     keyboard: 'number',
     message: 'Въведете стойност 2'
   }).appendTo(mosPage);

   //Създаване на TextView и TextInput за стойност 3
   new tabris.TextView({
     id: 'UgsValue3Label',
     text: 'Стойност 3:'
   }).appendTo(mosPage);

   new tabris.TextInput({
     id: 'UgsValue3Input',
     keyboard: 'number',
     message: 'Въведете стойност 3'
   }).appendTo(mosPage);

 //Създаване на бутон за измерване на параметрите на MOS транзистор
 new tabris.Button({
   id: 'measurmentMosButton',
   text: 'Заявка за измерване',
   background: '#8b0000',
   textColor: 'white'
 }).on('select', function() {

  //Създаване на Alert Dialog за измерването на параметрите на MOS транзистори
  new tabris.AlertDialog({
   title: 'Изчакайте резултатите от измерването',
   message: 'Заявката Ви за измерване е изпратена. Моля изчакайте.',
   buttons: {ok: 'Добре'}
 }).open();

 //Създаване на TextView за визуализация на резултатите
 mosMessage = new tabris.TextView({
  left: 18, right: 18, top: '#measurmentMosButton 10',
  font: "15px",
  background: '#8b0000',
  textColor: 'white'
 }).appendTo(mosPage);

  updateMessageMos();

 //Създаване на бутон за запис в Google Диск
  new tabris.Button({
    id: 'googleMosButton',
    text: 'Запиши в Google диск',
    left: 10,
    right: 10,
    bottom: 10,
    background: '#8b0000',
    textColor: 'white'
  }).on('select', function() {
    //saveToGoogle();
  }).appendTo(mosPage);

 }).appendTo(mosPage);

 mosPage.apply({
   '#nameMosLabel': {left: 18, top: 18, width: 180},
   '#nameMosInput': {left: '#nameMosLabel 10', right: 18, baseline: '#nameMosLabel'},
   '#facultyNumberMosLabel': {left: 18, top: '#nameMosLabel 18', width: 180},
   '#facultyNumberMosInput': {left: '#facultyNumberMosLabel 10', right: 18, baseline: '#facultyNumberMosLabel'},
   '#groupMosLabel': {left: 18, top: '#facultyNumberMosLabel 18', width: 180},
   '#groupNumberMosInput': {left: '#groupMosLabel 10', right: 18, baseline: '#groupMosLabel'},
   '#transistorMosLabel': {left: 18, top: '#groupMosLabel 18', width: 180},
   '#transistorMosPicker': {left: '#transistorMosLabel 10', right: 18, baseline: '#transistorMosLabel'},
   '#UdsLabel': {left: 18, top: '#transistorMosLabel 18', width: 180},
   '#UdsStartValueLabel': {left: 18, top: '#UdsLabel 18', width: 180},
   '#UdsStartValueInput': {left: '#UdsStartValueLabel 10', right: 18, baseline: '#UdsStartValueLabel'},
   '#UdsEndValueLabel': {left: 18, top: '#UdsStartValueLabel 18', width: 180},
   '#UdsEndValueInput': {left: '#UdsEndValueLabel 10', right: 18, baseline: '#UdsEndValueLabel'},
   '#UgsLabel': {left: 18, top: '#UdsEndValueLabel 18', width: 180},
   '#UgsValue1Label': {left: 18, top: '#UgsLabel 18', width: 180},
   '#UgsValue1Input': {left: '#UgsValue1Label 10', right: 18, baseline: '#UgsValue1Label'},
   '#UgsValue2Label': {left: 18, top: '#UgsValue1Label 18', width: 180},
   '#UgsValue2Input': {left: '#UgsValue2Label 10', right: 18, baseline: '#UgsValue2Label'},
   '#UgsValue3Label': {left: 18, top: '#UgsValue2Label 18', width: 180},
   '#UgsValue3Input': {left: '#UgsValue3Label 10', right: 18, baseline: '#UgsValue3Label'},
   '#measurmentMosButton': {left: 10, right: 10, top: '#UgsValue3Label 18'}
 });

 return mosPage;
}

//Функция за създаване на страница за измерване на параметрите на биполярен транзистор
function createBjtPage() {

 //Създаване и наименоване на страница за биполярен транзистор
 bjtPage = new tabris.Page({
   title: 'Биполярен транзистор'
 }).appendTo(navigationView);

 //Създаване на TextView и TextInput за име
 new tabris.TextView({
   id: 'nameBjtLabel',
   alignment: 'left',
   text: 'Име:'
 }).appendTo(bjtPage);

 new tabris.TextInput({
   id: 'nameBjtInput',
   message: 'Трите имена на студента'
 }).appendTo(bjtPage);

 //Създаване на TextView и TextInput за факултетен номер
 new tabris.TextView({
   id: 'facultyNumberBjtLabel',
   text: 'Факултетен номер:'
 }).appendTo(bjtPage);

 new tabris.TextInput({
   id: 'facultyNumberBjtInput',
   keyboard: 'number',
   message: 'Факултетен номер'
 }).appendTo(bjtPage);

 //Създаване на TextView и TextInput за група
 new tabris.TextView({
   id: 'groupBjtLabel',
   text: 'Група:'
 }).appendTo(bjtPage);

 new tabris.TextInput({
   id: 'groupNumberBjtInput',
   keyboard: 'number',
   message: 'Група'
 }).appendTo(bjtPage);

 //Създаване на TextView и Picker за избор на биполярен транзистор
 new tabris.TextView({
   id: 'transistorBjtLabel',
   text: 'Изберете транзистор:'
 }).appendTo(bjtPage);

 new tabris.Picker({
   id: 'transistorBjtPicker',
   itemCount: BJT.length,
   itemText: (index) => BJT[index],
   selectionIndex: 0
 }).appendTo(bjtPage);

 new tabris.TextView({
   id: 'UceLabel',
   text: 'Uce, V (0-12)'
 }).appendTo(bjtPage);

 //Създаване на TextView и TextInput за начална стойност за Uce
 new tabris.TextView({
   id: 'UceStartValueLabel',
   text: 'Начална стойност:'
 }).appendTo(bjtPage);

 new tabris.TextInput({
   id: 'UceStartValueInput',
   keyboard: 'number',
   message: 'Въведете начална стойност за Uce'
 }).appendTo(bjtPage);

 //Създаване на TextView и TextInput за крайна стойност за Uce
 new tabris.TextView({
   id: 'UceEndValueLabel',
   text: 'Крайна стойност:'
 }).appendTo(bjtPage);

 new tabris.TextInput({
   id: 'UceEndValueInput',
   keyboard: 'number',
   message: 'Въведете крайна стойност за Uce'
 }).appendTo(bjtPage);

 //Създаване на входни данни за Ib
  new tabris.TextView({
    id: 'IbLabel',
    text: 'Ib, uA'
  }).appendTo(bjtPage);

  //Създаване на TextView и TextInput за стойност 1
  new tabris.TextView({
    id: 'IbValue1Label',
    text: 'Стойност 1:'
  }).appendTo(bjtPage);

  new tabris.TextInput({
    id: 'IbValue1Input',
    keyboard: 'number',
    message: 'Въведете стойност 1'
  }).appendTo(bjtPage);

  //Създаване на TextView и TextInput за стойност 2
  new tabris.TextView({
    id: 'IbValue2Label',
    text: 'Стойност 2:'
  }).appendTo(bjtPage);

  new tabris.TextInput({
    id: 'IbValue2Input',
    keyboard: 'number',
    message: 'Въведете стойност 2'
  }).appendTo(bjtPage);

  //Създаване на TextView и TextInput за стойност 3
  new tabris.TextView({
    id: 'IbValue3Label',
    text: 'Стойност 3:'
  }).appendTo(bjtPage);

  new tabris.TextInput({
    id: 'IbValue3Input',
    keyboard: 'number',
    message: 'Въведете стойност 3'
  }).appendTo(bjtPage);

 //Създаване на бутон за измерване на параметрите на биполярен транзистор
 new tabris.Button({
   id: 'measurmentBjtButton',
   text: 'Заявка за измерване',
   background: '#8b0000',
   textColor: 'white'
 }).on('select', function() {

  //Създаване на Alert Dialog за измерването на параметрите на биполярен транзистори
  new tabris.AlertDialog({
   title: 'Изчакайте резултатите от измерването',
   message: 'Заявката Ви за измерване е изпратена. Моля изчакайте.',
   buttons: {ok: 'Добре'}
  }).open();

  //Създаване на TextView за визуализация на резултатите
  bjtMessage = new tabris.TextView({
   left: 18, right: 18, top: '#measurmentBjtButton 10',
   font: "15px",
   background: '#8b0000',
   textColor: 'white'
  }).appendTo(bjtPage);

  updateMessageBjt();

  //Създаване на бутон за запис в Google Диск
  new tabris.Button({
    id: 'googleBjtButton',
    text: 'Запиши в Google диск',
    left: 10,
    right: 10,
    bottom: 10,
    background: '#8b0000',
    textColor: 'white'
  }).on('select', function() {
    //saveToGoogle();
  }).appendTo(bjtPage);

 }).appendTo(bjtPage);

 bjtPage.apply({
   '#nameBjtLabel': {left: 18, top: 18, width: 180},
   '#nameBjtInput': {left: '#nameBjtLabel 10', right: 18, baseline: '#nameBjtLabel'},
   '#facultyNumberBjtLabel': {left: 18, top: '#nameBjtLabel 18', width: 180},
   '#facultyNumberBjtInput': {left: '#facultyNumberBjtLabel 10', right: 18, baseline: '#facultyNumberBjtLabel'},
   '#groupBjtLabel': {left: 18, top: '#facultyNumberBjtLabel 18', width: 180},
   '#groupNumberBjtInput': {left: '#groupBjtLabel 10', right: 18, baseline: '#groupBjtLabel'},
   '#transistorBjtLabel': {left: 18, top: '#groupBjtLabel 18', width: 180},
   '#transistorBjtPicker': {left: '#transistorBjtLabel 10', right: 18, baseline: '#transistorBjtLabel'},
   '#UceLabel': {left: 18, top: '#transistorBjtLabel 18', width: 180},
   '#UceStartValueLabel': {left: 18, top: '#UceLabel 18', width: 180},
   '#UceStartValueInput': {left: '#UceStartValueLabel 10', right: 18, baseline: '#UceStartValueLabel'},
   '#UceEndValueLabel': {left: 18, top: '#UceStartValueLabel 18', width: 180},
   '#UceEndValueInput': {left: '#UceEndValueLabel 10', right: 18, baseline: '#UceEndValueLabel'},
   '#IbLabel': {left: 18, top: '#UceEndValueLabel 18', width: 180},
   '#IbValue1Label': {left: 18, top: '#IbLabel 18', width: 180},
   '#IbValue1Input': {left: '#IbValue1Label 10', right: 18, baseline: '#IbValue1Label'},
   '#IbValue2Label': {left: 18, top: '#IbValue1Label 18', width: 180},
   '#IbValue2Input': {left: '#IbValue2Label 10', right: 18, baseline: '#IbValue2Label'},
   '#IbValue3Label': {left: 18, top: '#IbValue2Label 18', width: 180},
   '#IbValue3Input': {left: '#IbValue3Label 10', right: 18, baseline: '#IbValue3Label'},
   '#measurmentBjtButton': {left: 10, right: 10, top: '#IbValue3Label 18'/*'#currentPicker2 18'*/}
 });

 return bjtPage;
}

//Функция за визуализиране на информзацията за студента и резултатитите от измерването за MOS транзистор
function updateMessageMos() {

  mosMessage.text = [
    'Студент: ' + createStudentMos(),
    'Транзистор: ' + MOS[mosPage.children('#transistorMosPicker').first().selectionIndex],
    'Резултати от измерването: '
  ].join('\n') + '\n';

}

//Фунцкия, която връща информацията за студента въведена в страницата за MOS транзистор
function createStudentMos() {

  var studentMos = mosPage.children('#nameMosInput').first().text;
  var facultyNumberMos = mosPage.children('#facultyNumberMosInput').first().text;
  var groupMos = mosPage.children('#groupNumberMosInput').first().text;
  var infoMos = studentMos + ', Факултетен номер: ' + facultyNumberMos + ', Група: ' + groupMos;
  return infoMos;

}

//Функция за визуализиране на информзацията за студента и резултатитите от измерването за биполярния транзистор
function updateMessageBjt() {

  bjtMessage.text = [
    'Студент: ' + createStudentBjt(),
    'Транзистор: ' + BJT[bjtPage.children('#transistorBjtPicker').first().selectionIndex],
    'Резултати от измерването: '
  ].join('\n') + '\n';

}

//Фунцкия, която връща информацията за студента въведена в страницата за биполярния транзистор
function createStudentBjt() {

  var studentBjt = bjtPage.children('#nameBjtInput').first().text;
  var facultyNumberBjt = bjtPage.children('#facultyNumberBjtInput').first().text;
  var groupBjt = bjtPage.children('#groupNumberBjtInput').first().text;
  var infoBjt = studentBjt + ', Факултетен номер: ' + facultyNumberBjt + ', Група: ' + groupBjt;
  return infoBjt;

}

//Функция за създаване на страницза за Settings
function createSettingsPage() {

  //Създаване и наименоване на страница за Settings
  var settingsPage = new tabris.Page({
    title: 'Settings'
  }).on('appear', () => actionVisbility(false))
    .on('disappear', () => actionVisbility(true));

  //Създаване на бутон за разработчика на приложението
  new tabris.Button({
    id: 'authorButton',
    text: 'About author',
    background: '#8b0000',
    textColor: 'white'
  }).on('select', () => createAuthorPage().appendTo(navigationView))
    .appendTo(settingsPage)

//Създаване на TextView за сайта на дисциплината
  new tabris.TextView({
   id: 'siteLabel',
   alignment: 'left',
   text: 'Сайт на дисциплината',
   font: "15px",
   textColor: 'rgba(71, 161, 238, 0.75)'
  }).on('tap', () => createSiteWebviewPage().appendTo(navigationView))
  .appendTo(settingsPage);

  settingsPage.apply({
    '#siteLabel': {left: 18, top: 18, width: 320},
    '#authorButton': {left: 12, top: '#siteLabel 18', right: 618}
  });

  return settingsPage;
}

//Функция за визуализиране на страницата за Settings
function actionVisbility(isVisible) {
  tabris.ui.children('#settingsToggler').set('visible', isVisible);
}

//Функция за отваряне на сайта на дисциплината
function createSiteWebviewPage() {

  //Създаване и наименоване на страница за сайта на дисциплината
  let webPage = new tabris.Page({
    title: 'Сайт на дисциплината'
  }).on('appear', () => actionVisbility(false));

  //Създаване на WebView за сайта на дисциплината
  new tabris.WebView({
    left: 0, right: 0, top: 0, bottom: 0,
    url: 'https://lark.tu-sofia.bg/ppe/'
  }).appendTo(webPage);

  return webPage;
}

//Функция за създаване на страница за разработчика
function createAuthorPage() {

 //Създаване и наименоване на страница за разработчика
 let authorPage = new tabris.Page({
   title: 'About author'
 }).on('appear', () => actionVisbility(false));

 //Създаване на TextView с информацията за разработчика
 new tabris.TextView({
  left: 10, right: 10, top: '#authorButton 18',
  text: 'Тодор Петров Делев, ' +
        'Факултетен номер: 101213009, ' +
        'ФЕТТ, ' +
        'Група: 33'
 }).appendTo(authorPage);

 return authorPage;
}
