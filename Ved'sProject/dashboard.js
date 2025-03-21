const labelPosition = window.innerWidth < 600 ? 'inside' : 'outside';

// Graph for Non Member vs Member Patients

async function Membership_Count() {
    var chartDom = document.getElementById('Membership_Count_Graph');
    var myChart = echarts.init(chartDom);
    
    // API call
    try {
        const apiUrl = 'https://veddentalprojectapi.innosol.co.uk/DentalData/GetMembershipCount';

        // Fetch data from the API
        const response = await fetch(apiUrl);
        const apiData = await response.json();
        console.log("API Data:", apiData);

        // Process the API data to match the chart format
        const chartData = apiData.data.map(item => ({
            name: item.Member_Type, // Use "Member_Type" in the API JSON as the category names
            value: item.Count       // Use "Count" as the value
    }));
    
    console.log("Chart Data:", chartData);

    // Define the chart options
    const option = {
            // margins to ensure labels remain visible
            grid: {
                left: '10%',
                right: '10%',  
                bottom: '5%',
                containLabel: true
            },
        color: ["#5a61c4", "#2c0b50"],
        series: [
            {
                name: 'Membership Count',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: true,
                    position: labelPosition, // Moves labels outward
                    fontWeight: "bold",
                    fontSize: 11,
                    formatter: '{b}: {c} ({d}%)' // Shows name, count, and percentage
                },
                labelLine: {
                    show: 'outside',
                    length: 10,
                    length2: 5
                },
                data: chartData
                    }
                ]
    };

        // Set the chart option
        myChart.setOption(option);

        //error handling statement
      } catch (error) {
        console.error('Error fetching or rendering chart data:', error);
      }
    }


// Graph for Membership Revenue by Year

async function Membership_Revenue() {
    var chartDom = document.getElementById('Membership_Revenue_Graph');
    var myChart = echarts.init(chartDom);

    try {
        const apiUrl = 'https://veddentalprojectapi.innosol.co.uk/DentalData/GetMembershipRevenueByYear';

        // Fetch data from the API
        const response = await fetch(apiUrl);
        const apiData = await response.json();
        console.log("API Data:", apiData);

        // Sort data in ascending Year Order
        const sortedData = apiData.data.sort((a, b) => a.Year - b.Year);

        // Process the API data to match the chart format
        const year = sortedData.map(item => item.Year);  // X-axis categories
        const total = sortedData.map(item => item.Total); // Y-axis values

        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
        
                //Formats the tooltip hover information to be categorised by category:value
                formatter: function (params) {
                   let data = params[0];
                   console.log(data)
                   return `Year: ${data.name} <br/> Revenue: £${data.value.toLocaleString()}`;
                }
            },
            // margins to ensure labels remain visible
            grid: {
                right: '10%',  
                bottom: '4%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: year,
                axisTick: { alignWithLabel: true },
                name: 'Year',
                nameLocation: 'middle',
                nameGap: 20,
                nameTextStyle: {
                    fontSize: 14,
                    fontWeight: 'bold'
                }
            },
            yAxis: {
                type: 'value',
                name: 'Revenue (£)',
                nameLocation: 'middle',
                nameRotate: 90,
                nameGap: 64,
                nameTextStyle: {
                    fontSize: 14,
                    fontWeight: 'bold'
                }
            },
            series: [
                {
                    name: 'Membership Revenue By Year',
                    type: 'bar',
                    barWidth: '70%',
                    data: total,
                    itemStyle: { color: '#2c0b50' },
                    label: {
                        show: true,
                        position: 'top', // Displays value above bars
                        rotate: 90,
                        distance: 40,
                        fontSize: 12,
                        fontWeight: "bold"
                    }
                }
            ]
        };

        myChart.setOption(option);

        } catch (error) {
            console.error('Error fetching or rendering chart data:', error);
        }
    }



//Graph for Treatment popularity

async function Treatment_Count() {
    var chartDom = document.getElementById('Treatment_Count_Graph');
    var myChart = echarts.init(chartDom);
    var font_size = window.innerWidth < 600 ? 6 : 12; // Sets font_size to 6 when screen width below 600 px
    //API Call
    try {
        const apiUrl = 'https://veddentalprojectapi.innosol.co.uk/DentalData/GetTreatmentCount';

        // Fetch data from the API
        const response = await fetch(apiUrl);
        const apiData = await response.json();
        console.log("API Data:", apiData);

        // Process the API data to match the chart format
        const chartData = apiData.data.map(item => ({
            name: item.Treatment_Name, // Use "Treatment_Name" as the category names
            value: item.Count       // Use "Count" as the value
    }));

    console.log("Chart Data:", chartData);

    // Define the chart options
    const option = {
        // colours for each slice of the pie chart 
        color: ["#F48686","#F7C6C5","#999CCD","#E9F0AF","#A3CBCA","#00A99C","#AF6BA0","#9DB9F6","#ACD2BE","#428C6C"],
            // margins to ensure labels remain visible
            grid: {
                left: '10%',
                right: '10%',  
                bottom: '5%',
                containLabel: true
            },
        series: [
            {
                name: 'Treatment Count',
                type: 'pie',
                radius: ['40%', '70%'], // inner and outer circle radii
                avoidLabelOverlap: false,
                label: {
                    show: true,
                    position: labelPosition, // Moves labels outward
                    fontWeight: "bold",
                    fontSize: font_size,
                    formatter: '{b}: {c} ({d}%)' // Shows name, count, and percentage
                },
                labelLine: {
                    show: labelPosition === 'outside', 
                    length: 10,
                    length2: 5
                },
                data: chartData
            }
        ]
    };

        // Set the chart option
        myChart.setOption(option);

        //error handling statement
        } catch (error) {
        console.error('Error fetching or rendering chart data:', error);
        }
    }


// Graph for NHS vs Non-NHS patients

async function Patient_Type() {
    var chartDom = document.getElementById('Patient_Type_Graph');
    var myChart = echarts.init(chartDom);
    //API Call
    try {
        const apiUrl = 'https://veddentalprojectapi.innosol.co.uk/DentalData/GetPatientTypes';
    
        // Fetch data from the API
        const response = await fetch(apiUrl);
        const apiData = await response.json();
        console.log("API Data:", apiData);
    
        // Process the API data to match the chart format
        const chartData = apiData.data.map(item => ({
            name: item.Patient_Type, // Use "Patient_Type" as the category names
            value: item.Count       // Use "Count" as the value
        }));
        
    console.log("Chart Data:", chartData);
    
    const option = {
    // colours for chart 
    color: ["#F7926D","#E2F76D"],
    // margins to ensure labels remain visible
    grid: {
        left: '10%',
        right: '10%',  
        bottom: '5%',
        containLabel: true
    },
    series: [
        {
            name: 'Patient Count',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '80%'],
            label: {
                show: true,
                position: labelPosition, // Moves labels outward
                fontWeight: "bold",
                fontSize: 12,
                formatter: '{b}: {c} ({d}%)', // Shows name, count, and percentage
            },

            // adjusted start angle to make it a half pie chart for variation
            startAngle: 180,
            endAngle: 360,
            data: chartData
        },
        ],
        };
        myChart.setOption(option);

        //error handling statement
        } catch (error) {
        console.error('Error fetching or rendering chart data:', error);
        }
    }

// Graph for Revenue By Treatment

async function Revenue_By_Treatment() {
    var chartDom = document.getElementById('Revenue_By_Treatment_Graph');
    var myChart = echarts.init(chartDom);

    //API Call

    try {
    const apiUrl = 'https://veddentalprojectapi.innosol.co.uk/DentalData/GetTreatmentCount';

    // Fetch data from the API
    const response = await fetch(apiUrl);
    const apiData = await response.json();


    // Process the API data to match the chart format
    const treatment = apiData.data.map(item => item.Treatment_Name);  // X-axis categories
    const total = apiData.data.map(item => item.Total_Revenue); // Y-axis values

    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: function (params) {
                let data = params[0];
                console.log(data)
                return `Treatment: ${data.name} <br/> Revenue: £${data.value.toLocaleString()}`;
            }
            },


    // margins to ensure labels remain visible
    grid: {
        left: '10%',
        right: '10%',  
        bottom: '5%',
        containLabel: true
    },
    xAxis: [
        {
        type: 'category',
        data: treatment,
        axisTick: {alignWithLabel: true},
        name: 'Treatment Name',  // X-axis label
        nameLocation: 'middle',
        nameGap: 20,   // Space between label and axis
        nameTextStyle: {
        fontSize: 14,
        fontWeight: 'bold'
        }
    }
    ],
    yAxis: [
        {
        type: 'value',
        data: total,
        name: 'Revenue (£)', // Y-axis label
        nameLocation: 'middle',
        nameRotate: 90,  
        nameGap: 56,      // Space between label and axis
        nameTextStyle: {
        fontSize: 14,
        fontWeight: 'bold'
        }
    }
    ],
    series: [
        {
        name: 'Treatment Total Revenue',
        type: 'bar',
        barWidth: '70%',
        data: total,
        itemStyle: {
            color: '#63BFC6'
        },
        label: {
            show: true,
            position: 'top', // Displays value above bars
            fontSize: 12,
            fontWeight: 'bold',
            distance: 30,
            rotate: 90
        }

    
    }   
    ]
    };
    myChart.setOption(option);
    }
    //error handling statement
    catch (error) {
        console.error('Error fetching or rendering chart data:', error);
        }
    }

// Graph showing Treatment Revenue for each month

async function Treatment_Revenue_By_Month() {
    var chartDom = document.getElementById('Treatment_Revenue_By_Month_Graph');
    var myChart = echarts.init(chartDom);

    //API Call

    try {
        const apiUrl = 'https://veddentalprojectapi.innosol.co.uk/DentalData/GetTreatmentRevenueByMonth';

        // Fetch data from the API
        const response = await fetch(apiUrl);
        const apiData = await response.json();
        console.log("API Data:", apiData);

        // Mergesort on data to sort months in ascending order of revenue
        function mergeSort(arr) {
            if (arr.length <= 1) {
                return arr;
            }
    
            const mid = Math.floor(arr.length / 2);
            //recursively mergesorts left and right of the midpoint of the array
            const left = mergeSort(arr.slice(0, mid));
            const right = mergeSort(arr.slice(mid));
            
            return merge(left, right);
        }
    
        function merge(left, right) {
            let result = [];
            let i = 0, j = 0;
    
            while (i < left.length && j < right.length) {
                if (left[i].Total < right[j].Total) { // Sort by revenue (Total)
                    result.push(left[i]);
                    i++;
                } else {
                    result.push(right[j]);
                    j++;
                }
            }
            
            //merges data into one 'group' to be merged later with another
            return result.concat(left.slice(i)).concat(right.slice(j));
        }
    
        // Sort data using merge sort
        const sortedMonths = mergeSort(apiData.data);
    
        console.log("Sorted Data:", sortedMonths);

        // Process the new sorted data to match the chart format
        var month = sortedMonths.map(item => item.Month);  
        const revenue = sortedMonths.map(item => item.Total); 

        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow' // Highlights bars when hovered
                },
                //Formats the tooltip hover information to be categorised by category:value
                formatter: function (params) {
                    let data = params[0]; // Get hovered data point
                    return `Month: ${data.name} <br/> Revenue: £${data.value.toString()}`; 
                },
            },
            // margins to ensure labels remain visible
            grid: {
                left: '10%',
                right: '10%',  
                bottom: '10%',
                containLabel: true
            },
            xAxis: { 
                type: 'value',
                name: 'Revenue (£)',
                nameLocation: 'middle',  // Centers the label
                nameGap: 30,  // Adjusts space between label and axis
                nameTextStyle: {
                    fontSize: 14,
                    fontWeight: 'bold',
                    align: "centre"
                }
            },
            yAxis: { 
                type: 'category',
                name: 'Month',
                nameLocation: 'middle',  // Centers the label
                nameGap: 65,  // Adjusts space between label and axis
                data: month,
                nameTextStyle: {
                    fontSize: 14,
                    fontWeight: 'bold',
                    fontSize: 12
                }
            },
            series: [
                {
                    name: 'Total Revenue',
                    type: 'bar',
                    data: revenue,
                    barWidth: '70%',
                    itemStyle: {
                        color:  '#99B3EB'
                    },
                    label: {
                        show: true,
                        position: 'right', // Displays value above bars
                        fontSize: 12,
                        fontWeight: 'bold'
                    }

                    
                }
            ]
        };

        myChart.setOption(option);

    // error handling statement

    } catch (error) {
        console.error('Error fetching or rendering chart data:', error);
    }
    }

// Graph to show Male vs Female Patients

async function Patient_Gender() {
    var chartDom = document.getElementById('Patient_Gender_Graph');
    var myChart = echarts.init(chartDom);

    //API Call

    try {
        const apiUrl = 'https://veddentalprojectapi.innosol.co.uk/DentalData/GetPatientGenders';

        // Fetch data from the API
        const response = await fetch(apiUrl);
        const apiData = await response.json();
        console.log("API Data:", apiData);

        // Process the API data to match the chart format
        const chartData = apiData.data.map(item => ({
            name: item.Gender, // Use "Gender" as the category names
            value: item.Count       // Use "Count" as the value
    }
    )
    );
    
    console.log("Chart Data:", chartData);

    // Define the chart options
    const option = {
        // colours used
        color: ["#5a61c4", "#2c0b50"],
                // margins to ensure labels remain visible
        grid: {
            left: '10%',
            right: '10%',  
            bottom: '5%',
            containLabel: true
        },
        series: [
            {
                name: 'Gender Count',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: true,
                    position: labelPosition, // Moves labels outward
                    fontWeight: "bold",
                    formatter: '{b}: {c} ({d}%)' // Shows name, count, and percentage
                },
                labelLine: {
                    show: true, // Ensure label lines are displayed properly
                    length: 10,
                    length2: 5
                },
                data: chartData
            }
        ]
    };

        // Set the chart option
        myChart.setOption(option);

        //error handling statement

        } catch (error) {
        console.error('Error fetching or rendering chart data:', error);
        }
    }

// Graph to show Membership Type popularity

async function Membership_Type() {
    var chartDom = document.getElementById('Membership_Type_Graph');
    var myChart = echarts.init(chartDom);

    //API Call
    try {
        const apiUrl = 'https://veddentalprojectapi.innosol.co.uk/DentalData/GetMembershipTypes';

        // Fetch data from the API
        const response = await fetch(apiUrl);
        const apiData = await response.json();
        console.log("API Data:", apiData);

        // Process API data: Group by MembershipName
        const membershipLevels = [...new Set(apiData.data.map(item => item.MembershipName))];

        // Extract counts for "Annual" and "Monthly"
        const annualCounts = membershipLevels.map(level => {
            return apiData.data.find(item => item.MembershipName === level && item.Frequency === "Annual")?.Count || 0;
        });

        const monthlyCounts = membershipLevels.map(level => {
            return apiData.data.find(item => item.MembershipName === level && item.Frequency === "Monthly")?.Count || 0;
        });

        // Chart option
        var option = {
            color: ["#5a61c4", "#2c0b50"],
            legend: {
                data: ['Annual', 'Monthly'], //Plots annual data first for each membership, the monthly as a composite bar
                bottom: 0,

            },
            // margins to ensure labels remain visible
            grid: {
                left: '10%',
                right: '10%',  
                bottom: '8%',
                containLabel: true
            },
            xAxis: { 
                type: 'value',
                name: 'Count',
                nameLocation: 'middle',
                nameGap: 20,
                nameTextStyle: {
                    fontSize: 14,
                    fontWeight: 'bold'
                }
            },
            yAxis: { 
                type: 'category',
                name: 'Membership Type',
                nameLocation: 'middle',
                nameGap: 60,
                nameTextStyle: {
                    fontSize: 14,
                    fontWeight: 'bold'
                },
                data: membershipLevels
            },
            series: [
                {
                    name: 'Annual',
                    type: 'bar',
                    stack: 'total',
                    data: annualCounts,
                    label: { show: true, position: 'insideRight' }
                },
                {
                    name: 'Monthly',
                    type: 'bar',
                    stack: 'total',
                    data: monthlyCounts,
                    label: { show: true, position: 'insideRight' }
                }
            ]
        };

        myChart.setOption(option);

    // error handling statements
    } catch (error) {
        console.error('Error fetching or rendering chart data:', error);
    }
}

// Graph for Membership Purchases by Year

async function Year_Joined() {
    var chartDom = document.getElementById('Year_Joined_Graph');
    var myChart = echarts.init(chartDom);
    var font_size = window.innerWidth < 600 ? 7 : 12;
    //API Call
    try {
        const apiUrl = 'https://veddentalprojectapi.innosol.co.uk/DentalData/GetMembershipYears';

        // Fetch data from the API
        const response = await fetch(apiUrl);
        const apiData = await response.json();
        console.log("API Data:", apiData);

        const chartData = apiData.data.map(item => ({
            name: item.Year_Joined, // Use "Year_Joined" as the category names
            value: item.Count       // Use "Count" as the value
        }));
        
        console.log("Chart Data:", chartData);
    
        // Define the chart options
        const option = {
            color: ["#F48686","#F7C6C5","#999CCD","#E9F0AF","#A3CBCA","#00A99C","#AF6BA0","#9DB9F6","#ACD2BE","#428C6C"],
            
            // margins to ensure labels remain visible
            grid: {
                left: '10%',
                right: '10%',  
                bottom: '5%',
                containLabel: true
            },
            series: [
                {
                    name: 'Year Joined',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: true,
                        position: labelPosition,
                        fontSize: font_size,
                        fontWeight: "bold",
                        formatter: '{b}: {c} ({d}%)' // Shows name, count, and percentage
                    },
                    labelLine: {
                        show: true, 
                        length: 10,
                        length2: 5
                    },
                    data: chartData
                }
            ]
        };
    
            // Set the chart option
            myChart.setOption(option);
        
        //error handling statement
          } catch (error) {
            console.error('Error fetching or rendering chart data:', error);
          }
        }

// Graph to show Patient Age breakdown

async function Patient_Age() {
    var chartDom = document.getElementById('Patient_Age_Graph');
    var myChart = echarts.init(chartDom);

    //API Call
    try {
    const apiUrl = 'https://veddentalprojectapi.innosol.co.uk/DentalData/GetPatientAgeGroups';

    // Fetch data from the API
    const response = await fetch(apiUrl);
    const apiData = await response.json();


    // Process the API data to match the chart format
    const ages = apiData.data.map(item => item.Age_Range);  // X-axis categories
    const total = apiData.data.map(item => item.Count); // Y-axis values

    var option = {

    // margins to ensure labels remain visible
    grid: {
        left: '10%',
        right: '10%',  
        bottom: '5%',
        containLabel: true
    },
    xAxis: [
        {
        type: 'category',
        data: ages,
        axisTick: {alignWithLabel: true},
        name: 'Age Group',  // X-axis label
        nameLocation: 'middle',
        nameGap: 20,   // Space between label and axis
        nameTextStyle: {
        fontSize: 14,
        fontWeight: 'bold'
        }
    }
    ],
    yAxis: [
        {
        type: 'value',
        name: 'Count', // Y-axis label
        nameLocation: 'middle',
        nameRotate: 90,  
        nameGap: 56,      // Space between label and axis
        nameTextStyle: {
        fontSize: 14,
        fontWeight: 'bold'
        }
    }
    ],
    series: [
        {
        name: 'Patients By Age Group',
        type: 'bar',
        barWidth: '70%',
        data: total,
        itemStyle: {
            color: '#2c0b50' //Brand Colour
        },
        label: {
            show: true,
            position: 'top', // Places value above each bar
            fontSize: 12,
            fontWeight: 'bold'
    }
    }   
    ]
    };
    myChart.setOption(option);
    }
    //error handling statement
    catch (error) {
        console.error('Error fetching or rendering chart data:', error);
        }
    }

    // executed when logout is pressed, sets IsLoggedIn back to 0, resets SignUpMsg if True and redirects to login screen
    function logout(){
        sessionStorage.setItem("IsLoggedIn",0);
        window.sessionStorage.setItem('SignUpMsg',"false");
        window.location.href = "./index.html";
    }

// Call all functions
Membership_Count()
Membership_Revenue()
Treatment_Count()
Patient_Type()
Revenue_By_Treatment()
Treatment_Revenue_By_Month();
Patient_Gender()
Membership_Type()
Year_Joined()
Patient_Age()