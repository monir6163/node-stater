const newData = 
[
    {
        "_id": "646230a875e025fc452635f9",
        "technology": "diploma in engineering",
        "results": {
            "passed": null,
            "rollP": null,
            "gpa": null,
            "GPA": null,
            "CGPA": null,
            "CGPAp": null,
            "failed": "936461 {  66661(T) }",
            "rollF": "936461",
            "subjects": "{  66661(T) }"
        },
        "semester": "8th",
        "regulation": "2016",
        "Date": "15-05-2023",
        "roll": "936461",
        "institute": null
    },
    {
        "_id": "64037613ef7a7a3a14a9ee7d",
        "technology": "diploma in engineering",
        "results": {
            "passed": null,
            "rollP": null,
            "gpa": null,
            "GPA": null,
            "CGPA": null,
            "CGPAp": null,
            "failed": "936461 {  66661(T), 68546(T) }",
            "rollF": "936461",
            "subjects": "{  66661(T), 68546(T) }"
        },
        "semester": "7th",
        "regulation": "2016",
        "Date": "05-12-2022",
        "roll": "936461",
        "institute": null
    },
    {
        "_id": "6403758cef7a7a3a14a9195c",
        "technology": "diploma in engineering",
        "results": {
            "passed": null,
            "rollP": null,
            "gpa": null,
            "GPA": null,
            "CGPA": null,
            "CGPAp": null,
            "failed": "936461 {  66661(T), 66667(T), 68546(T) }",
            "rollF": "936461",
            "subjects": "{  66661(T), 66667(T), 68546(T) }"
        },
        "semester": "6th",
        "regulation": "2016",
        "Date": "04-07-2022",
        "roll": "936461",
        "institute": null
    },
    {
        "_id": "64036fe9ef7a7a3a14a41e3b",
        "technology": "diploma in engineering",
        "results": {
            "passed": null,
            "rollP": null,
            "gpa": null,
            "GPA": null,
            "CGPA": null,
            "CGPAp": null,
            "failed": "936461 {  66652(T), 68546(T) }",
            "rollF": "936461",
            "subjects": "{  66652(T), 68546(T) }"
        },
        "semester": "5th",
        "regulation": "2016",
        "Date": "22-03-2020",
        "roll": "936461",
        "institute": null
    },
    {
        "_id": "64036f2bef7a7a3a14a343b6",
        "technology": "diploma in engineering",
        "results": {
            "passed": null,
            "rollP": null,
            "gpa": null,
            "GPA": null,
            "CGPA": null,
            "CGPAp": null,
            "failed": "936461 {  66644(T) }",
            "rollF": "936461",
            "subjects": "{  66644(T) }"
        },
        "semester": "4th",
        "regulation": "2016",
        "Date": "06-10-2019",
        "roll": "936461",
        "institute": null
    }
]


//Sort the array by date in ascending order
const sortedData = newData.sort((a, b) => new Date(a.Date) - new Date(b.Date));

// Create an object to keep track of unique semesters
const uniqueSemesters = {};

// Iterate over each entry in the sorted array
const filteredData = sortedData.filter(entry => {
  // Check if the semester is already present in the uniqueSemesters object
  if (uniqueSemesters[entry.semester]) {
    return false; // Duplicate semester, skip this entry
  } else {
    uniqueSemesters[entry.semester] = true;
    return true; // Unique semester, include this entry
  }
});

// console.log(filteredData);




function getResultStatus(data) {
    // Filter By Semister
    let filtered = data.sort((a, b) => {
      let x = a.semester.match(/\d+/)
      let y = b.semester.match(/\d+/)
      return Number(x) - Number(y)
    })
  
    //   Filter by Status
    let result = filtered.reduce((acc, curr) => {
      const regex = /\d+/g
      const match = curr?.results?.subjects?.match(regex)
  
      let lastSemister = acc?.length ? acc[acc.length - 1] : undefined
  
      let previousSemistersSubjects = acc?.length
        ? Array.from(new Set(acc.map((i) => i.current).flat()))
        : []
  
      let current = match.filter(
        (item) => !previousSemistersSubjects.includes(item)
      )
  
      // This condition works if current semsiter has no subject and return passed
      if (!current) {
        return [
          ...acc,
          {
            semester: curr?.semester,
            status: 'passed',
            current,
            subjects: [],
          },
        ]
      }
    
  
      // This contions work if both semister has subject
      let lastSemisterFailed = Boolean(
        match.filter((v) => lastSemister?.current?.includes(v))?.length
      )
  
      //Define Last Semister Passed or failed:
      acc = acc.map((item) => {
        if (item.semester === lastSemister.semester) {
          return { ...item, status: lastSemisterFailed ? 'failed' : 'passed' }
        } else {
          return { ...item }
        }
      })
  
      let data = {
        semester: curr?.semester,
        status: current?.length ? 'failed' : 'passed',
        current,
        subjects: match,
      }
  
      return [...acc, data]
    }, [])
  
    return result
  }

//   let result = getResultStatus(data)

let resultFinal = getResultStatus(filteredData);
console.log(resultFinal);

function getSemesterName(array, code) {
    let semister;
    array.forEach((element) => {
        
        if (element?.current?.includes(code)) {
            semister = element.semester;
        }
        

        
    });
    return semister;
}
let sem = getSemesterName(resultFinal, "66743");
console.log(sem);



