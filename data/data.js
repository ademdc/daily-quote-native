import Feeling from '../models/Feeling'

export const FEELINGS = [
  new Feeling('c1', 'Happy', '#f5428d'),
  new Feeling('c2', 'Normala', '#f54242'),
  new Feeling('c3', 'Worried', '#f5a442'),
  new Feeling('c4', 'Angry', '#f5d142'),
  new Feeling('c6', 'Sad', '#41d95d'),
  new Feeling('c7', 'Jelaous', '#9eecff'),
  new Feeling('c8', 'Lonely', '#b9ffb0'),
  new Feeling('c9', 'Afraid', '#ffc7ff'),
  new Feeling('c10', 'Surprised', '#8fd3ed'),
  new Feeling('c11', 'Excited', '#aafdd3'),
  new Feeling('c11', 'Busy', '#86cdf4'),
  new Feeling('c5', 'Horny', '#368dff')

];

export const RADIO_BUTTON_FEELING_PERIOD = [
  {
    label: 'Day',
    value: 'day'
   },
   {
    label: 'Week',
    value: 'week'
   },
   {
    label: 'Month',
    value: 'month'
   },
   {
    label: 'Year',
    value: 'year'
   }
];

export const RADIO_BUTTON_PERSON = [
  {
    label: 'Me',
    value: 'me'
   },
   {
    label: 'Partner',
    value: 'partner'
   }
];
