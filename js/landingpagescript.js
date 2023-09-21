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
        const formattedDate = `${monthName}/${year}`;
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
    var number_of_bars = 7
    var options = {
        colors: ["#1B89FF", "#EDEFF1"],
        // backgroundBarColors: ["#f00"],
        legend: {
            show: false
        },
        series: [
            {
                name: 'SproutySocial',
                // data: resultArray1?.slice(),
                data: resultArray1?.slice(-number_of_bars),
            },
            // {
            //     name: 'Others',
            //     data: resultArray2?.slice(-number_of_bars),
            // }
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
        plotOptions: {
            bar: {
                borderRadius: 14,
                borderRadiusApplication: 'end'
            }
        },
        grid: {
            show: true,
            borderColor: '#CDDBEB', // Color of grid lines
            strokeDashArray: 4,
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
            categories: generateMonthlyDates(number_of_bars),
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
            show: true,
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
    var number_of_bars = 7
    if (!weeklyR1 || weeklyR1?.length === 0) {
        const [r1, r2] = generateArrays(usercurrentFollowersCount, 4);
        weeklyR1 = r1;
        weeklyR2 = r2
    }
    var options = {
        colors: ["#1B89FF", "#EDEFF1"],
        legend: {
            show: false
        },
        series: [
            {
                name: 'SproutySocial',
                // data: resultArray1?.slice(0, 8),
                // data: generateWeeklyData(resultArray1),
                data: weeklyR1?.slice(0, number_of_bars),
            },
            {
                name: 'Others',
                // data: resultArray2?.slice(0, number_of_bars),
                // data: generateWeeklyData(resultArray2),
                data: weeklyR2?.slice(0, number_of_bars),
            },
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
        plotOptions: {
            bar: {
                borderRadius: 10,
                borderRadiusApplication: 'end'
            }
        },
        grid: {
            show: true,
            borderColor: '#CDDBEB', // Color of grid lines
            strokeDashArray: 4,
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
            categories: generateWeeklyDateRanges(number_of_bars),
            labels: {
                offsetX: 3,
            }
        },
        yaxis: {
            show: true,
        }
    };

    return options
}

const renderDailyChart = () => {
    var number_of_bars = 7
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
        colors: ["#1B89FF", "#c1c1c1"],
        legend: {
            show: false
        },
        series: [
            {
                name: 'Others',
                // data: resultArray2?.slice(0, number_of_bars),
                // data: generateWeeklyData(resultArray2),
                data: weeklyR2?.slice(0, number_of_bars),
            },
            {
                name: 'SproutySocial',
                data: generateDailyData(weeklyR1).slice(0, number_of_bars),
                // data: dailyR1?.slice(0, 7),
            },
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
        plotOptions: {
            bar: {
                borderRadius: 10,
                borderRadiusApplication: 'end'
            }
        },
        grid: {
            show: true,
            borderColor: '#CDDBEB', // Color of grid lines
            strokeDashArray: 4,
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
            categories: generateDates(number_of_bars),
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
            show: true,
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
    // return;
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

            document.getElementById('dash-preview').classList.remove('hidden');

            var profile_pic_url = user.profile_pic_url
            var full_name = user.full_name
            var username = user.username
            var follower_count = user.follower_count
            var without_sprouty = numFormatter(withoutSprouty)
            var with_sproutyVal = `${numFormatter(withSprouty)}${withSprouty >= 1000000 ? '+' : ''}`;

            document.getElementById('profile_pic_url').src = profile_pic_url
            document.getElementById('full_name').textContent = full_name
            document.getElementById('username').textContent = `@${username}`
            document.getElementById('username1').textContent = `@${username}`
            document.getElementById('follower_count').textContent = follower_count
            document.getElementById('without_sprouty').textContent = without_sprouty
            document.getElementById('with_sproutyVal').textContent = with_sproutyVal

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