const calendar = ({ className, themeColor, onDateClick }) => {
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  let calendarContainer = document.querySelector(`.${className}`);
  const uniqueId = Math.floor(100000 + Math.random() * 900000);
  calendarContainer.appendChild(
    renderCalendarLayout(themeColor, days, uniqueId, onDateClick)
  );
  addDayText(new Date(), uniqueId);
};

const renderCalendarLayout = (themeColor, days, uniqueId, onDateClick) => {
  const calendarLayout = document.createElement('div', { class: 'black' });
  calendarLayout.classList.add('grid');
  calendarLayout.classList.add(themeColor ? themeColor : 'black');

  renderNavigation(calendarLayout, uniqueId);

  days.forEach((element) => {
    const div = document.createElement('div');
    div.classList.add('dayOfWeek');
    div.textContent = element;
    calendarLayout.appendChild(div);
  });

  for (let day = 0; day < 42; day++) {
    const buttonId = `day${day}-${uniqueId}`;
    const button = document.createElement('button');
    button.addEventListener(
      'click',
      (e) => {
        const dateString = e.target.getAttribute('data');
        let selectedDate = new Date(dateString);
        onDateClick(selectedDate);
      },
      false
    );
    button.id = buttonId;
    button.classList.add(`day`);
    calendarLayout.appendChild(button);
  }
  return calendarLayout;
};

const renderNavigation = (calendarLayout, uniqueId) => {
  const monthYearDivId = `monthYear${uniqueId}`;
  let button = document.createElement('button');
  button.classList.add('arrow');
  button.classList.add('leftArrow');
  button.setAttribute(
    'onClick',
    `handleOnArrowClick("left", '${monthYearDivId}', '${uniqueId}')`
  );
  calendarLayout.appendChild(button);

  const div = document.createElement('div');
  div.id = monthYearDivId;
  div.classList.add('currentMonthYear');
  div.textContent = getMonthYear(new Date());
  calendarLayout.appendChild(div);

  button = document.createElement('button');
  button.classList.add('arrow');
  button.classList.add('rightArrow');
  button.setAttribute(
    'onClick',
    `handleOnArrowClick("right", '${monthYearDivId}', '${uniqueId}')`
  );
  calendarLayout.appendChild(button);
};

const addDayText = (date, uniqueId, dateClick) => {
  let startDayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay(); //  date.getDay(); //3  1 - 31 days
  const endDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  //previous month
  const previousDate = new Date(date.getFullYear(), date.getMonth(), 0);
  const previousEndDay = previousDate.getDate();
  let previousStartDay = previousEndDay - startDayIndex + 1;
  for (let dayIndex = 0; dayIndex < startDayIndex; dayIndex++) {
    const currentDay = document.querySelector(`#day${dayIndex}-${uniqueId}`);
    currentDay.classList.add('disabled');
    currentDay.setAttribute(
      'data',
      `${
        previousDate.getMonth() + 1
      }/${previousStartDay}/${previousDate.getFullYear()}`
    );
    currentDay.textContent = previousStartDay;
    previousStartDay++;
  }
  //current month
  let day = 1;
  while (day <= endDay) {
    const currentDay = document.querySelector(
      `#day${startDayIndex}-${uniqueId}`
    );
    currentDay.classList.remove('disabled');
    currentDay.setAttribute(
      'data',
      `${date.getMonth() + 1}/${day}/${date.getFullYear()}`
    );
    currentDay.textContent = day;
    day++;
    startDayIndex++;
  }
  //next month
  const nextDate = new Date(date.getFullYear(), date.getMonth() + 2, 0);
  let nextDay = 1;
  for (let dayIndex = startDayIndex; dayIndex <= 41; dayIndex++) {
    const currentDay = document.querySelector(`#day${dayIndex}-${uniqueId}`);
    currentDay.setAttribute(
      'data',
      `${nextDate.getMonth() + 1}/${nextDay}/${nextDate.getFullYear()}`
    );
    currentDay.classList.add('disabled');
    currentDay.textContent = nextDay;
    nextDay++;
  }
};

const handleOnArrowClick = (arrow, monthYearDivId, unqiueId) => {
  const currentMonthYear = document.querySelector(`#${monthYearDivId}`);

  const date = new Date(currentMonthYear.textContent);
  date.setDate(1);
  if (arrow === 'left') date.setMonth(date.getMonth() - 1);
  else date.setMonth(date.getMonth() + 1);

  currentMonthYear.textContent = getMonthYear(date);
  addDayText(date, unqiueId);
};

const handleDateClick = (event) => {
  console.log(event);
};

const getMonthYear = (date) => {
  return `${getMonthName(date)} ${date.getFullYear()}`;
};

const getMonthName = (date) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return monthNames[date.getMonth()];
};
