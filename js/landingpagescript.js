var chartRange = 'Monthly';
var usercurrentFollowersCount = 0;
var withSprouty = 0;
var withoutSprouty = 0;
var username = '';
var [resultArray1, resultArray2] = [0, 0];
var [weeklyR1, weeklyR2] = [0, 0];
var [dailyR1, dailyR2] = [0, 0];

const chartRangetoggleDropdown = () => {
    const chartRangeDropdownEl = document.querySelectorAll('.chartRangeDropdown')
    chartRangeDropdownEl.forEach(chartRangeDropdown => {
        if (chartRangeDropdown.classList.contains('opacity-0')) {
            chartRangeDropdown.classList.remove('opacity-0', 'pointer-events-none')
            chartRangeDropdown.classList.add('opacity-100', 'pointer-events-all')
        } else {
            chartRangeDropdown.classList.remove('opacity-100', 'pointer-events-all')
            chartRangeDropdown.classList.add('opacity-0', 'pointer-events-none')
        }
    });
}

const toggleChartRangeDropdown = (range) => {
    chartRange = range.toString()
    const selectedRange = document.querySelector('#selectedRange')
    selectedRange.textContent = range.toString();

    chartRangetoggleDropdown();

    if (chartRange === 'Monthly') {
        const options = renderMonthlyChart();
        document.querySelector("#chart2").classList.add("hidden")
        document.querySelector("#dailyChartEl").classList.add("hidden")
        document.querySelector("#chart1").classList.remove("hidden")
        document.querySelector("#chart1").classList.add("block")
        const el = document.querySelector("#chart1")
        if (el) {
            var chart = new ApexCharts(el, options);
            chart.render();
        }
    } else if (chartRange === 'Weekly') {
        const options = renderWeeklyChart()
        document.querySelector("#chart1").classList.add("hidden")
        document.querySelector("#dailyChartEl").classList.add("hidden")
        document.querySelector("#chart2").classList.remove("hidden")
        document.querySelector("#chart2").classList.add("block")
        const el = document.querySelector("#chart2")
        if (el) {
            var chart = new ApexCharts(el, options);
            chart.render();
        }
    }

    else {
        document.querySelector("#chart1").classList.add("hidden")
        document.querySelector("#chart2").classList.add("hidden")
        document.querySelector("#dailyChartEl").classList.remove("hidden")
        document.querySelector("#dailyChartEl").classList.add("block")

        const options = renderDailyChart();
        const dailyChartEl = document.querySelector("#dailyChartEl")
        if (dailyChartEl) {
            var chart = new ApexCharts(dailyChartEl, options);
            chart.render();
        }
    }
}

function generateDates(range) {
    var dateList = [];
    var currentDate = new Date();

    // Generate dates for the next 11 days
    for (var i = 0; i < range; i++) {
        var date = new Date(currentDate.getTime() + (i * 24 * 60 * 60 * 1000));
        var formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
        dateList.push(formattedDate);
    }
    return dateList;
}

function generateMonthlyDates(months) {
    const currentDate = new Date();
    const dates = [];

    // for (let i = 0; i < months; i++) {
    //     currentDate.setMonth(currentDate.getMonth() + 1);
    //     const month = currentDate.getMonth() + 1;
    //     const year = currentDate.getFullYear() % 100; // Get the last two digits of the year
    //     const formattedDate = `${month}/${year}`;
    //     dates.push(formattedDate);
    // }

    // return dates;

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let i = 0; i < months; i++) {
        currentDate.setMonth(currentDate.getMonth() + 1);
        const monthIndex = currentDate.getMonth();
        const monthName = monthNames[monthIndex];
        const year = currentDate.getFullYear() % 100; // Get the last two digits of the year
        const formattedDate = `${monthName}, ${year}`;
        dates.push(formattedDate);
    }

    return dates;
}

function generateWeeklyDateRanges(range) {
    var dateRangeList = [];
    var currentDate = new Date();

    // Get the current day of the week (00, 6, where 0 represents Sunday)
    var currentDayOfWeek = currentDate.getDay();

    // Calculate the first day of the current week
    var firstDayOfWeek = new Date(currentDate.getTime() - (currentDayOfWeek * 24 * 60 * 60 * 1000));

    // Generate date ranges for the next 'range' weeks
    for (var i = 0; i < range; i++) {
        var startDate = new Date(firstDayOfWeek.getTime() + (i * 7 * 24 * 60 * 60 * 1000));
        var endDate = new Date(startDate.getTime() + (6 * 24 * 60 * 60 * 1000));

        var formattedStartDate = `${startDate.getMonth() + 1}/${startDate.getDate()}`;
        var formattedEndDate = `${endDate.getMonth() + 1}/${endDate.getDate()}`;

        var dateRange = `${formattedStartDate} - ${formattedEndDate}`;
        dateRangeList.push(dateRange);
    }

    return dateRangeList;
}

function getRandomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateArrays(baseNumber, weekly) {
    if (!baseNumber) return [0, 0];
    // console.log(baseNumber);
    // console.log(weekly);
    // baseNumber = 899999
    var withSproutyMin, withSproutyMax, withoutSproutyMin, withoutSproutyMax;
    if (baseNumber >= 1 && baseNumber <= 999) {
        withoutSproutyMin = 10;
        withoutSproutyMax = 30;
        withSproutyMin = 300;
        withSproutyMax = 800;
    } else if (baseNumber >= 1000 && baseNumber <= 1999) {
        withoutSproutyMin = 40;
        withoutSproutyMax = 50;
        withSproutyMin = 600;
        withSproutyMax = 1600;
    } else if (baseNumber >= 2000 && baseNumber <= 4999) {
        withoutSproutyMin = 70;
        withoutSproutyMax = 80;
        withSproutyMin = 900;
        withSproutyMax = 2000;
    } else if (baseNumber >= 5000 && baseNumber <= 9999) {
        withoutSproutyMin = 100;
        withoutSproutyMax = 150;
        withSproutyMin = 1000;
        withSproutyMax = 2000;
    } else if (baseNumber >= 10000 && baseNumber <= 19999) {
        withoutSproutyMin = 150;
        withoutSproutyMax = 200;
        withSproutyMin = 1000;
        withSproutyMax = 2000;
    } else if (baseNumber >= 20000 && baseNumber <= 49999) {
        withoutSproutyMin = 350;
        withoutSproutyMax = 500;
        withSproutyMin = 1500;
        withSproutyMax = 3500;
    } else if (baseNumber >= 50000) {
        withoutSproutyMin = 750;
        withoutSproutyMax = 1500;
        withSproutyMin = 1500;
        withSproutyMax = 3500;
    }

    var m1Min = weekly ? withSproutyMin / weekly : withSproutyMin;
    var m1Max = weekly ? withSproutyMax / weekly : withSproutyMax;
    var m2Min = weekly ? withoutSproutyMin / weekly : withoutSproutyMin;
    var m2Max = weekly ? withoutSproutyMax / weekly : withoutSproutyMax;
    const array1 = [baseNumber + getRandomNumberInRange(m1Min, m1Max)];
    const array2 = [baseNumber + getRandomNumberInRange(m2Min, m2Max)];

    for (let i = 1; i < 12; i++) {
        const prev1 = array1[i - 1];
        const prev2 = array2[i - 1];

        const next1 = prev1 + getRandomNumberInRange(m1Min, m1Max);
        const next2 = prev2 + getRandomNumberInRange(m2Min, m2Max);

        array1.push(next1);
        array2.push(next2);
    }

    return [array1, array2];
}

const renderMonthlyChart = () => {
    var options = {
        colors: ["#ef5f3c", "#c1c1c1"],
        legend: {
            show: false
        },
        series: [
            {
                name: 'SproutySocial',
                // data: resultArray1?.slice(),
                data: resultArray1?.slice(-11),
            },
            {
                name: 'Others',
                data: resultArray2?.slice(-11),
            }
        ],
        chart: {
            height: 450,
            type: 'line',
            toolbar: {
                show: false,
            },
            id: 'areachart'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            // curve: 'straight',
            // width: [2, 1],
            width: 3,
        },
        grid: {
            show: false,
            padding: {
                left: 8,
                right: 8,
            },
        },
        tooltip: {
            enabled: true,
        },
        xaxis: {
            type: 'category',
            categories: generateMonthlyDates(11),
            labels: {
                offsetX: 3,
                // formatter: function (value, timestamp, opts) {
                //     const date = new Date(timestamp);
                //     const month = (date.getMonth() + 1).toString().padStart(2, '0');
                //     const day = date.getDate().toString().padStart(2, '0');
                //     return month + '/' + day;
                // }
            }
        },
        yaxis: {
            show: false,
        }
    };

    return options
}

function divideNumber(number) {
    const numbers = [];
    let remaining = number;

    for (let i = 0; i < 4 - 1; i++) {
        const min = Math.floor(remaining / (4 - i) * 0.8); // Adjust the factor (0.8) as needed
        const max = Math.ceil(remaining / (4 - i) * 1.2); // Adjust the factor (1.2) as needed
        const currentNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        numbers.push(currentNumber);
        remaining -= currentNumber;
    }

    numbers.push(remaining);
    return numbers;
}

function generateDailyData(array) {
    const result = [];

    array.forEach(item => {
        const p = divideNumber(item - usercurrentFollowersCount);
        p.forEach(i => {
            result.push(i);
        });

    });

    console.log(array);
    console.log(result);
    return result;
}

function distributeAndSortArray(array) {
    // Sort the array in ascending order
    const sortedArray = array.sort((a, b) => a - b);

    const result = [];
    const length = sortedArray.length;

    // Calculate the increment based on the maximum value and array length
    const increment = Math.ceil(sortedArray[length - 1] / length);

    // Distribute the values with a minimum difference of increment
    for (let i = 0; i < length; i++) {
        const distributedValue = sortedArray[0] + (i * increment);
        result.push(distributedValue);
    }

    return result;
}

function divideAndSortNumber(number) {
    const parts = [];
    let remainder = number;

    // Divide the number into four parts
    for (let i = 0; i < 3; i++) {
        const part = Math.floor(remainder / (4 - i));
        parts.push(part);
        remainder -= part;
    }
    parts.push(remainder + 1); // Add 1 to the last part for a larger difference

    // Sort the parts in ascending order
    parts.sort((a, b) => a - b);

    // Return the result
    return parts;
}

function generateWeeklyData(array) {
    const newArray = [];

    // Loop through the given array
    for (let i = 0; i < array.length; i++) {
        const divided = distributeAndSortArray(divideAndSortNumber(array[i]));
        newArray.push(...divided);
    }

    // Remove the first 4 values
    // const trimmedArray = newArray.slice(16);
    const trimmedArray = newArray;
    return trimmedArray.slice(0, 8);
}

const renderWeeklyChart = () => {
    if (!weeklyR1 || weeklyR1?.length === 0) {
        const [r1, r2] = generateArrays(usercurrentFollowersCount, 4);
        weeklyR1 = r1;
        weeklyR2 = r2
    }
    var options = {
        colors: ["#ef5f3c", "#c1c1c1"],
        legend: {
            show: false
        },
        series: [
            {
                name: 'SproutySocial',
                // data: resultArray1?.slice(0, 8),
                // data: generateWeeklyData(resultArray1),
                data: weeklyR1?.slice(0, 8),
            },
            {
                name: 'Others',
                // data: resultArray2?.slice(0, 8),
                // data: generateWeeklyData(resultArray2),
                data: weeklyR2?.slice(0, 8),
            }
        ],
        chart: {
            height: 450,
            type: 'line',
            toolbar: {
                show: false,
            },
            id: 'areachart'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            // curve: 'straight',
            // width: [2, 1],
            width: 3,
        },
        grid: {
            show: false,
            padding: {
                left: 8,
                right: 8,
            },
        },
        tooltip: {
            enabled: true,
        },
        xaxis: {
            type: 'category',
            categories: generateWeeklyDateRanges(8),
            labels: {
                offsetX: 3,
            }
        },
        yaxis: {
            show: false,
        }
    };

    return options
}

const renderDailyChart = () => {
    // if (!dailyR1 || dailyR1?.length === 0) {
    //     const [r1, r2] = generateArrays(usercurrentFollowersCount, 4);
    //     dailyR1 = r1;
    //     dailyR2 = r2
    // }
    if (!weeklyR1 || weeklyR1?.length === 0) {
        const [r1, r2] = generateArrays(usercurrentFollowersCount, 4);
        weeklyR1 = r1;
        weeklyR2 = r2
    }

    console.log(weeklyR1[0]);

    var options = {
        colors: ["#ef5f3c", "#c1c1c1"],
        legend: {
            show: false
        },
        series: [
            {
                name: 'SproutySocial',
                data: generateDailyData(weeklyR1).slice(0, 7),
                // data: dailyR1?.slice(0, 7),
            }
        ],
        chart: {
            height: 450,
            type: 'bar',
            toolbar: {
                show: false,
            },
            id: 'areachart'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            // curve: 'straight',
            // width: [2, 1],
            width: 3,
        },
        grid: {
            show: false,
            padding: {
                left: 8,
                right: 8,
            },
        },
        tooltip: {
            enabled: true,
        },
        xaxis: {
            type: 'category',
            categories: generateDates(7),
            labels: {
                offsetX: 3,
                // formatter: function (value, timestamp, opts) {
                //     const date = new Date(timestamp);
                //     const month = (date.getMonth() + 1).toString().padStart(2, '0');
                //     const day = date.getDate().toString().padStart(2, '0');
                //     return month + '/' + day;
                // }
                datetimeFormatter: {
                    year: 'yyyy',
                    month: 'MMM yyyy',
                    week: 'MMM dd',
                    day: 'MMM dd',
                },
            }
        },
        yaxis: {
            show: false,
        }
    };

    return options
}

function getUsernameFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('username');
}

async function getUserData() {
    const username = getUsernameFromURL();
    if (!username) return { message: 'no username' }

    const url = "https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/ig_profile";
    const params = { ig: username, response_type: "short", corsEnabled: "true" };

    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "47e2a82623msh562f6553fe3aae6p10b5f4jsn431fcca8b82e",
            "X-RapidAPI-Host": "instagram-bulk-profile-scrapper.p.rapidapi.com",
        },
    };

    const r = await fetch(`${url}?${new URLSearchParams(params)}`, options)
        .then(response => response.json())
        .then(data => {
            var res = { message: 'success', data: data?.[0] }
            return res
        })
        .catch(error => {
            // Handle errors
            console.log(error);
            return { message: error?.message }
        });
    return r
}

const numFormatter = (num = 0) => {
    if (num > 999 && num <= 999949) {
        return `${(num / 1000).toFixed(1)}k`
    }

    if (num > 999949) {
        return `${(num / 1000000).toFixed(1)}m`
    }

    if (num === 0) return 0

    if (num) {
        return num
    }
}

const getLastItem = (array) => array[array.length - 1]

function calculatePercentageDifference(num1, num2) {
    // Calculate the absolute difference between the numbers
    const difference = Math.abs(num1 - num2);

    // Calculate the percentage difference
    const percentageDifference = (difference / ((num1 + num2) / 2)) * 100;

    return percentageDifference;
}

window.addEventListener('DOMContentLoaded', async () => {
    return;
    const res = await getUserData()
    if (res?.message === 'success') {
        // console.log(res.data);
        const user = res.data
        if (user) {
            const buttons = document.querySelectorAll('.custom-button-content');
            buttons.forEach(button => {
                button.textContent = `Start Free Trial @${user.username}`;
            });
            usercurrentFollowersCount = user.follower_count
            var [r1, r2] = generateArrays(usercurrentFollowersCount);
            // console.log(r1, r2);
            resultArray1 = r1
            resultArray2 = r2
            withSprouty = getLastItem(r1)
            withoutSprouty = getLastItem(r2)
            // console.log(calculatePercentageDifference(50, 70));
            // console.log(calculatePercentageDifference(withSprouty, withoutSprouty));

            // var username = user.username


            const root = document.getElementById('root');
            root.innerHTML = `
            <div class="rounded-[14px] shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] overflow-hidden">
              <div id="header" class="bg-[#F2F4F7] text-black h-[70px]">
                <div class="brand-logo-2 w-nav-brand py-4 px-[32px]">
                  <img src="images/dash-preview/sproutysocial (1).png" loading="lazy"
                    sizes="(max-width: 767px) 100vw, 265px"
                    srcset="images/dash-preview/sproutysocial (1).png 500w, images/dash-preview/sproutysocial (1).png 800w, images/dash-preview/sproutysocial (1).png 1080w, images/dash-preview/sproutysocial (1).png 1500w"
                    alt="Sprouty Social Logo, ball with rocket in S" class="logo-4">
                  <img src="images/dash-preview/sproutysocial-dark.png" loading="lazy"
                    sizes="(max-width: 479px) 100vw, (max-width: 767px) 150px, 100vw"
                    srcset="images/dash-preview/sproutysocial-dark.png 500w, images/dash-preview/sproutysocial-dark.png 800w, images/dash-preview/sproutysocial-dark.png 1500w"
                    alt="rocket with S in a ball" class="logo-4 on-mobile">
                </div>
              </div>

              <div
                class="w-full flex justify-between items-center px-4 md:px-10 py-5 mb-10 bg-white shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.02)]">
                <div class="font-[600] text-base lg:text-2xl text-black">
                  Growth Trajectory for <span class="font-normal text-[#EF5F3C]">@${user.username}</span>
                </div>

                <div
                  class="relative bg-[#F9F9FB] text-[#1B89FF] border border-[#E7E9EE] rounded-md p-[13px] text-lg font-bold">
                  <div class="flex items-center justify-center cursor-pointer text-[600]"
                    onclick="chartRangetoggleDropdown()">
                    <span class="p-0 flex items-center" id="selectedRange">Monthly</span>
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512"
                      class="w-[12px] mr-[16px] ml-[7px]" height="14px" width="16px" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z">
                      </path>
                    </svg>
                  </div>

                  <!-- modal -->
                  <div
                    class="chartRangeDropdown absolute w-full top-full left-0 rounded-[10px] z-[2] text-black bg-white opacity-0 pointer-events-none"
                    style="box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 3px; transition: opacity 0.15s ease-in 0s;">
                    <div class="py-4 px-[30px] hover:bg-[#f8f8f8] hover:text-[#1B89FF] cursor-pointer"
                      onclick="toggleChartRangeDropdown('Monthly')" id="Monthly">Monthly</div>
                    <div class="py-4 px-[30px] hover:bg-[#f8f8f8] hover:text-[#1B89FF] cursor-pointer"
                      onclick="toggleChartRangeDropdown('Weekly')" id="Weekly">Weekly</div>
                    <div class="py-4 px-[30px] hover:bg-[#f8f8f8] hover:text-[#1B89FF] cursor-pointer"
                      onclick="toggleChartRangeDropdown('Daily')" id="Daily">Daily</div>
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-between gap-[25px] px-10 h-[124px] overflow-hidden mt-[35px]">
                <!-- user -->
                <div class="flex items-center rounded-xl border border-[#E0E3EF] bg-[#F9F9FB] pl-5 pr-16 py-[13px]">
                  <!-- image -->
                  <div class="relative mr-[12px] lg:mr-[20px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="98" height="98" viewBox="0 0 98 98" fill="none">
                      <circle cx="49" cy="49" r="48.0257" stroke="url(#paint0_linear_114_1660)"
                        stroke-width="1.94861" />
                      <defs>
                        <linearGradient id="paint0_linear_114_1660" x1="108.316" y1="10.3158" x2="2.76691e-06"
                          y2="76.079" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#C913B9" />
                          <stop offset="0.500947" stop-color="#F9373F" />
                          <stop offset="1" stop-color="#FECD00" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <img
                      class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[50px] h-[50px] lg:w-[80px] lg:h-[80px] rounded-full"
                      src="${user.profile_pic_url}" alt="user-dp">
                  </div>

                  <!-- details -->
                  <div class="flex flex-col">
                    <div class="flex items-center gap-1 text-base lg:text-[20px] font-[500]">${user.full_name}<img alt="" class="lg:hidden platform-logo"
                        src="https://app.SproutySocial.com/instagram.svg" width="16px" height="16px">
                    </div>
                    <div class="mt-[6px] mb-3 text-[14px] leading-[16.8px] font-semibold text-[#5A6387]">@${user.username}</div>
                    <div class="flex items-center">
                      <div class="text-[14px] leading-[15.6px] tracking-[0.52px] flex whitespace-nowrap font-bold text-[#EF5F3C] uppercase">with SproutySocial</div>
                    </div>
                  </div>
                </div>

                <!-- stats -->
                <div class="flex gap-[15px] w-full">
                  <div class="flex-1 max-w-[190px] border border-[#E0E3EF] h-[124px] rounded-xl overflow-hidden flex flex-col justify-center items-center">
                    <div class="text-[14px] lg:text-[16px] font-[600] false">
                      Followers
                    </div>
                    <div class="flex flex-col justify-between items-center text-center relative">
                      <div class="text-[24px] lg:text-4xl lg:leading-[38.4px] font-bold mt-[14px]">
                        ${numFormatter(user.follower_count)}
                      </div>
                      <div class="absolute lg:static top-[calc(100%-10px)] left-[50%] translate-x-[-50%] py-1 px-2 rounded-[7px] bg-[#c8f7e1] text-[#23df85] mt-1 hidden d-flex items-center gap-1 text-[10px] lg:text-[12px] font-bold font-MontserratBold lg:mr-[-32px] xl:mr-0">
                        123 <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" color="#1B89FF"
                          height="12" width="12" xmlns="http://www.w3.org/2000/svg" style="color: rgb(27, 137, 255);">
                          <path
                            d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z">
                          </path>
                        </svg>
                        </div>
                    </div>
                  </div>

                  <div class="flex-1 max-w-[190px] border bg-[#1B89FF] text-white h-[124px] rounded-xl overflow-hidden flex flex-col justify-center items-center">
                    <div class="text-[14px] lg:text-[16px] font-[600]">
                    with Sprouty</div>
                    <div class="text-[24px] lg:text-4xl lg:leading-[38.4px] font-bold mt-[14px]">
                      ${numFormatter(withSprouty)}${withSprouty >= 1000000 ? '+' : ''}
                    </div>
                  </div>

                  <div class="flex-1 max-w-[190px] border border-[#E0E3EF] h-[124px] rounded-xl overflow-hidden flex flex-col justify-center items-center">
                    <div class="text-[14px] lg:text-[16px] font-[600] text-[#333]">
                      without Sprouty</div>
                    <div class="text-[24px] lg:text-4xl lg:leading-[38.4px] font-bold mt-[14px]">
                      543
                      ${numFormatter(withoutSprouty)}
                    </div>
                  </div>
                </div>

                <div class="hidden bg-[#f8f8f8] text-[#5A6387] md:bg-transparent lg:mt-0 w-full rounded-[10px]">
                  <div class="flex justify-between items-center gap-1 lg:gap-4 w-full text-center">

                    <!-- Followers -->
                    <div
                      class="text-[#5A6387] w-[30%] h-full cursor-pointer rounded-[10px] flex flex-col justify-center itext-center p-2 lg:pt-3 xl:pr-4 lg:pb-[2px] lg:pl-5 lg:shadow-[0_0_3px_#00000040]"
                      style="transition: all 0.15s ease-in 0s;">
                      <div class="text-[12px] font-MontserratSemiBold lg:text-[16px] font-[500] false">
                        Followers
                      </div>
                      <div class="flex flex-col lg:flex-row justify text-center relative">
                        <div
                          class="text-[24px] lg:text-4xl lg:leading-[54px] font-MontserratBold font-bold w-full text-center">
                          ${numFormatter(user.follower_count)}</div>
                        <div
                          class="absolute lg:static top-[calc(100%-10px)] left-[50%] translate-x-[-50%] py-1 px-2 rounded-[7px] bg-[#c8f7e1] text-[#23df85] mt-1 hidden d-flex items-center gap-1 text-[10px] lg:text-[12px] font-bold font-MontserratBold lg:mr-[-32px] xl:mr-0">
                          123 <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512"
                            color="#1B89FF" height="12" width="12" xmlns="http://www.w3.org/2000/svg"
                            style="color: rgb(27, 137, 255);">
                            <path
                              d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z">
                            </path>
                          </svg></div>
                      </div>
                    </div>


                    <div
                      class="bg-[#EF5F3C] text-white w-[30%] h-ful cursor-pointer rounded-[10px] flex flex-col justify-center itext-center p-2 lg:pt-3 xl:pr-4 lg:pb-[2px] lg:pl-5 lg:shadow-[0_0_3px_#00000040]"
                      style="transition: all 0.15s ease-in 0s;">
                      <div class="text-[12px] font-MontserratSemiBold lg:text-[16px] font-[600]">
                        with Sprouty</div>
                      <div class="text-[24px] lg:text-4xl lg:leading-[54px] font-MontserratBold font-bold">
                        ${numFormatter(withSprouty)}${withSprouty >= 1000000 ? '+' : ''}
                      </div>
                    </div>


                    <div
                      class="text-[#5A6387] md:text-black w-[30%] h-ful cursor-pointer rounded-[10px] flex flex-col justify-center itext-center p-2 lg:pt-3 xl:pr-4 lg:pb-[2px] lg:pl-5 lg:shadow-[0_0_3px_#00000040]"
                      style="transition: all 0.15s ease-in 0s;">
                      <div class="text-[12px] font-MontserratSemiBold lg:text-[16px] font-[600] text-[#333]">
                        without Sprouty</div>
                      <div class="text-[24px] lg:text-4xl lg:leading-[54px] font-MontserratBold font-bold">
                        ${numFormatter(withoutSprouty)}
                      </div>
                    </div>


                  </div>
                </div>
              </div>

              <section class="py-5 lg:px-10">
                <div class="">
                  <div id="chart1"></div>
                  <div id="chart2"></div>
                  <div id="dailyChartEl"></div>
                </div>
              </section>
            </div>
            `

            const options = renderMonthlyChart();
            document.querySelector("#chart2").classList.add("hidden")
            document.querySelector("#chart1").classList.remove("hidden")
            document.querySelector("#chart1").classList.add("block")
            const el = document.querySelector("#chart1")
            if (el) {
                var chart = new ApexCharts(el, options);
                chart.render();
            }
        }
    }
})