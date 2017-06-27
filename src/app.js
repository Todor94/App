const {
  Button, Action, ImageView, TextView, TextInput, Picker, Page, ScrollView, AlertDialog, WebView, ui
} = require('tabris');

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

//Задаване на фон за началната страница
var imageView = new tabris.ImageView({
  left: 0, top: 0, right: 0, bottom: 0,
  image: 'images/MainPage.jpg',
  scaleMode: 'stretch'
}).appendTo(mainPage);

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

 //Задаване на фон за страницата за MOS транзистор
 var imageViewMos = new tabris.ImageView({
   left: 0, top: 0, right: 0, bottom: 0,
   image: 'images/BackgroundsMOS.jpg',
   scaleMode: 'stretch'
 }).appendTo(mosPage);

 //Създаване на TextView и TextInput за име
 new tabris.TextView({
   id: 'nameLabelMos',
   alignment: 'left',
   text: 'Име:'
 }).appendTo(mosPage);

 new tabris.TextInput({
   id: 'nameInputMos',
   message: 'Трите имена на студента'
 }).appendTo(mosPage);

 //Създаване на TextView и TextInput за факултетен номер
 new tabris.TextView({
   id: 'facultyNumberLabelMos',
   text: 'Факултетен номер:'
 }).appendTo(mosPage);

 new tabris.TextInput({
   id: 'facultyNumberInputMos',
   keyboard: 'number',
   message: 'Факултетен номер'
 }).appendTo(mosPage);

 //Създаване на TextView и TextInput за група
 new tabris.TextView({
   id: 'groupLabelMos',
   text: 'Група:'
 }).appendTo(mosPage);

 new tabris.TextInput({
   id: 'groupNumberInputMos',
   keyboard: 'number',
   message: 'Група'
 }).appendTo(mosPage);

 //Създаване на TextView и Picker за избор на MOS транзистор
 new tabris.TextView({
   id: 'transistorLabelMos',
   text: 'Изберете транзистор:'
 }).appendTo(mosPage);

 new tabris.Picker({
   id: 'transistorPickerMos',
   items: ['MOS 1', 'MOS 2', 'MOS 3', 'MOS 4']
 }).appendTo(mosPage);

 //Създаване на TextView и Picker за избор минималното напрежение на MOS транзистор
 new tabris.TextView({
   id: 'voltageLabel',
   text: 'Задайте минимална стойност на напрежението:'
 }).appendTo(mosPage);

 new tabris.Picker({
   id: 'voltagePicker',
   items: ['50 mV', '100 mV', '150 mV', '200 mV']
 }).appendTo(mosPage);

 //Създаване на TextView и Picker за избор на максималното напрецение на MOS транзистор
 new tabris.TextView({
   id: 'voltageLabel2',
   text: 'Задайте максимална стойност на напрежението:'
 }).appendTo(mosPage);

 new tabris.Picker({
   id: 'voltagePicker2',
   items: ['1 V', '2 V', '3 V', '4 V']
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
   '#nameLabelMos': {left: 18, top: 18, width: 180},
   '#nameInputMos': {left: '#nameLabelMos 10', right: 18, baseline: '#nameLabelMos'},
   '#facultyNumberLabelMos': {left: 18, top: '#nameLabelMos 18', width: 180},
   '#facultyNumberInputMos': {left: '#facultyNumberLabelMos 10', right: 18, baseline: '#facultyNumberLabelMos'},
   '#groupLabelMos': {left: 18, top: '#facultyNumberLabelMos 18', width: 180},
   '#groupNumberInputMos': {left: '#groupLabelMos 10', right: 18, baseline: '#groupLabelMos'},
   '#transistorLabelMos': {left: 18, top: '#groupLabelMos 18', width: 180},
   '#transistorPickerMos': {left: '#transistorLabelMos 10', right: 18, baseline: '#transistorLabelMos'},
   '#voltageLabel': {left: 18, top: '#transistorLabelMos 18', width: 180},
   '#voltagePicker': {left: '#voltageLabel 10', right: 18, baseline: '#voltageLabel'},
   '#voltageLabel2': {left: 18, top: '#voltagePicker 18', width: 180},
   '#voltagePicker2': {left: '#voltageLabel2 10', right: 18, baseline: '#voltageLabel2'},
   '#measurmentMosButton': {left: 10, right: 10, top: '#voltagePicker2 18'}
 });

 return mosPage;
}

//Функция за създаване на страница за измерване на параметрите на биполярен транзистор
function createBjtPage() {

 //Създаване и наименоване на страница за биполярен транзистор
 bjtPage = new tabris.Page({
   title: 'Биполярен транзистор'
 }).appendTo(navigationView);

 //Задаване на фон за страницата за биполярен транзистор
 var imageViewBjt = new tabris.ImageView({
   left: 0, top: 0, right: 0, bottom: 0,
   image: 'images/BackgroundsBJT.gif',
   scaleMode: 'fit'
 }).appendTo(bjtPage);

 //Създаване на TextView и TextInput за име
 new tabris.TextView({
   id: 'nameLabelBjt',
   alignment: 'left',
   text: 'Име:'
 }).appendTo(bjtPage);

 new tabris.TextInput({
   id: 'nameInputBjt',
   message: 'Трите имена на студента'
 }).appendTo(bjtPage);

 //Създаване на TextView и TextInput за факултетен номер
 new tabris.TextView({
   id: 'facultyNumberLabelBjt',
   text: 'Факултетен номер:'
 }).appendTo(bjtPage);

 new tabris.TextInput({
   id: 'facultyNumberInputBjt',
   keyboard: 'number',
   message: 'Факултетен номер'
 }).appendTo(bjtPage);

 //Създаване на TextView и TextInput за група
 new tabris.TextView({
   id: 'groupLabelBjt',
   text: 'Група:'
 }).appendTo(bjtPage);

 new tabris.TextInput({
   id: 'groupNumberInputBjt',
   keyboard: 'number',
   message: 'Група'
 }).appendTo(bjtPage);

 //Създаване на TextView и Picker за избор на биполярен транзистор
 new tabris.TextView({
   id: 'transistorLabelBjt',
   text: 'Изберете транзистор:'
 }).appendTo(bjtPage);

 new tabris.Picker({
   id: 'transistorPickerBjt',
   items: ['BJT 1', 'BJT 2', 'BJT 3', 'BJT 4']
 }).appendTo(bjtPage);

 //Създаване на TextView и Picker за избор минималния ток на биполярен транзистор
 new tabris.TextView({
   id: 'currentLabel',
   text: 'Задайте минимална стойност на тока:'
 }).appendTo(bjtPage);

 new tabris.Picker({
   id: 'currentPicker',
   items: ['50 mA', '100 mA', '150 mA', '200 mA']
 }).appendTo(bjtPage);

 //Създаване на TextView и Picker за избор максималния ток на биполярен транзистор
 new tabris.TextView({
   id: 'currentLabel2',
   text: 'Задайте максимална стойност на тока:'
 }).appendTo(bjtPage);

 new tabris.Picker({
   id: 'currentPicker2',
   items: ['300 mA', '500 mA', '750 mA', '1 A']
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
   '#nameLabelBjt': {left: 18, top: 18, width: 180},
   '#nameInputBjt': {left: '#nameLabelBjt 10', right: 18, baseline: '#nameLabelBjt'},
   '#facultyNumberLabelBjt': {left: 18, top: '#nameLabelBjt 18', width: 180},
   '#facultyNumberInputBjt': {left: '#facultyNumberLabelBjt 10', right: 18, baseline: '#facultyNumberLabelBjt'},
   '#groupLabelBjt': {left: 18, top: '#facultyNumberLabelBjt 18', width: 180},
   '#groupNumberInputBjt': {left: '#groupLabelBjt 10', right: 18, baseline: '#groupLabelBjt'},
   '#transistorLabelBjt': {left: 18, top: '#groupLabelBjt 18', width: 180},
   '#transistorPickerBjt': {left: '#transistorLabelBjt 10', right: 18, baseline: '#transistorLabelBjt'},
   '#currentLabel': {left: 18, top: '#transistorLabelBjt 18', width: 180},
   '#currentPicker': {left: '#currentLabel 10', right: 18, baseline: '#currentLabel'},
   '#currentLabel2': {left: 18, top: '#currentPicker 18', width: 180},
   '#currentPicker2': {left: '#currentLabel2 10', right: 18, baseline: '#currentLabel2'},
   '#measurmentBjtButton': {left: 10, right: 10, top: '#currentPicker2 18'}
 });

 return bjtPage;
}

//Функция за визуализиране на информзацията за студента и резултатитите от измерването за MOS транзистор
function updateMessageMos() {

  mosMessage.text = [
    'Студент: ' + createStudentMos(),
    'Транзистор: ' + createTransistorMos(),
    'Резултати от измерването: '
  ].join('\n') + '\n';

}

//Фунцкия, която връща информацията за студента въведена в страницата за MOS транзистор
function createStudentMos() {

  var studentMos = mosPage.children('#nameInputMos').first().text;
  var facultyNumberMos = mosPage.children('#facultyNumberInputMos').first().text;
  var groupMos = mosPage.children('#groupNumberInputMos').first().text;
  var infoMos = studentMos + ', Факултетен номер: ' + facultyNumberMos + ', Група: ' + groupMos;
  return infoMos;

}

//Функция, която връща информацията за MOS транзистора
function createTransistorMos() {

  var transistorMos = mosPage.children('#transistorPickerMos').first().selection;
  var voltage = mosPage.children('#voltagePicker').first().selection;
  var voltage2 = mosPage.children('#voltagePicker2').first().selection;
  var transistorInfoMos = transistorMos + ', с минимално напрежение: ' + voltage + ' и максимално напрежение: ' + voltage2;
  return transistorInfoMos;

}

//Функция за визуализиране на информзацията за студента и резултатитите от измерването за биполярния транзистор
function updateMessageBjt() {

  bjtMessage.text = [
    'Студент: ' + createStudentBjt(),
    'Транзистор: ' + createTransistorBjt(),
    'Резултати от измерването: '
  ].join('\n') + '\n';

}

//Фунцкия, която връща информацията за студента въведена в страницата за биполярния транзистор
function createStudentBjt() {

  var studentBjt = bjtPage.children('#nameInputBjt').first().text;
  var facultyNumberBjt = bjtPage.children('#facultyNumberInputBjt').first().text;
  var groupBjt = bjtPage.children('#groupNumberInputBjt').first().text;
  var infoBjt = studentBjt + ', Факултетен номер: ' + facultyNumberBjt + ', Група: ' + groupBjt;
  return infoBjt;

}

//Функция, която връща информацията за биполярния транзистора
function createTransistorBjt() {

  var transistorBjt = bjtPage.children('#transistorPickerBjt').first().selection;
  var current = bjtPage.children('#currentPicker').first().selection;
  var current2 = bjtPage.children('#currentPicker2').first().selection;
  var transistorInfoBjt = transistorBjt + ', с минимален ток: ' + current + ' и максимален ток: ' + current2;
  return transistorInfoBjt;

}

//Функция за създаване на страницза за Settings
function createSettingsPage() {

  //Създаване и наименоване на страница за Settings
  var settingsPage = new tabris.Page({
    title: 'Settings'
  }).on('appear', () => actionVisbility(false))
    .on('disappear', () => actionVisbility(true));

  //Задаване на фон за страницата за Settings
  var imageViewSettings = new tabris.ImageView({
    left: 0, top: 0, right: 0, bottom: 0,
    image: 'images/Settings.jpg',
    scaleMode: 'fit'
  }).appendTo(settingsPage);

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
