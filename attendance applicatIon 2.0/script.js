const students = [
    { roll: '190', name: 'SHASHANK ANAND' },
    { roll: '191', name: 'SUVAMOY SAMANTA' },
    { roll: '192', name: 'PRASHANT KUMAR SHAW' },
    { roll: '193', name: 'KHUSHI KUMARI' },
    { roll: '194', name: 'DEEPTA ROY' },
    { roll: '195', name: 'KALYANI MALIK' },
    { roll: '196', name: 'ABHAY KUMAR MAHTO' },
    { roll: '197', name: 'BISWADIP GIRI' },
    { roll: '198', name: 'PRAVEEN KUMAR YADAV' },
    { roll: '199', name: 'SHIVAM DEEP' },
    { roll: '200', name: 'MD IMRAN SARKAR' },
    { roll: '201', name: 'AYAN DUTTA' },
    { roll: '202', name: 'ANKIT KUMAR GUPTA' },
    { roll: '203', name: 'PRACHI PRIYA' },
    { roll: '204', name: 'SHIVANG MAJUMDER' },
    { roll: '205', name: 'UDAY KANT' },
    { roll: '206', name: 'DWAIPAYAN SARKAR' },
    { roll: '207', name: 'SOUNDERJA BHADRA' },
    { roll: '208', name: 'TANISA GHOSH' },
    { roll: '209', name: 'SOHAM PAUL' },
    { roll: '210', name: 'ARIJIT DAS' },
    { roll: '211', name: 'SOUMYAJIT DALAL' },
    { roll: '212', name: 'ANKIT CHATTERJEE' },
    { roll: '213', name: 'ANUJ ACHARJEE' },
    { roll: '214', name: 'SOHINI SAMANTA' },
    { roll: '215', name: 'SIMRAN DEY' },
    { roll: '216', name: 'SOUMILI SARKAR' },
    { roll: '217', name: 'NANDINI GHOSH' },
    { roll: '218', name: 'ANKITA MITRA' },
    { roll: '219', name: 'SAMPA DAS' },
    { roll: '220', name: 'PRAPTI SAHA' },
    { roll: '221', name: 'MANSI RAJ' },
    { roll: '222', name: 'ZEESHAN HAIDER' },
    { roll: '223', name: 'MD NAWSHIN IZAZ AKHTAR' },
    { roll: '224', name: 'UDDIPAN GHOSH' },
    { roll: '225', name: 'KANISHKA KUMAR SHAW' },
    { roll: '226', name: 'BHANU PRATAP' },
    { roll: '227', name: 'JYOTI PANDEY' },
    { roll: '228', name: 'SHUBHAM TIWARY' },
    { roll: '229', name: 'KRISH KUMAR RAY' },
    { roll: '230', name: 'UJJAL DHARA' },
    { roll: '231', name: 'ROHIT KUMAR' },
    { roll: '232', name: 'ROHINI NANDI' },
    { roll: '233', name: 'DEBALEENA NANDY' },
    { roll: '234', name: 'ANUSKA KUMARI' },
    { roll: '235', name: 'AFSHAH ANJUM' },
    { roll: '236', name: 'HAMEN BHANDARI' },
    { roll: '237', name: 'RIYA KUMARI' },
    { roll: '238', name: 'TATIM ADAK' },
    { roll: '239', name: 'RUPSA CHOWDHURY' },
    { roll: '240', name: 'PRIYA MISHRA' },
    { roll: '241', name: 'SUSOVAN DAS' },
    { roll: '242', name: 'KAUSIK NASKAR' },
    { roll: '243', name: 'TRISHANJIT GOSWAMI' },
    { roll: '244', name: 'SOHAM DAS' },
    { roll: '245', name: 'NEEPAN BISWAS' },
    { roll: '246', name: 'SUBHRAJYOTI PAL' },
    { roll: '247', name: 'TANISHK SIDHARTH' },
    { roll: '248', name: 'GOPAL DUTTA' },
    { roll: '249', name: 'DEBOPRATIM BISWAS' },
    { roll: '250', name: 'DEEPSHIKA GHOSH' },
    { roll: '251', name: 'AADITYA GUPTA' },
    { roll: '252', name: 'SANJAY KARATI' },
    { roll: '253', name: 'SOURAV SHAW' },
    { roll: '254', name: 'RAJVEER SINGH'},
];

window.addEventListener('load', () => {
    const tableBody = document.querySelector('#attendanceTable tbody');
    students.forEach(student => {
        const row = document.createElement('tr');

        const rollCell = document.createElement('td');
        rollCell.textContent = student.roll;

        const nameCell = document.createElement('td');
        nameCell.textContent = student.name;

        const presentCell = document.createElement('td');
        const checkboxContainer = document.createElement('div');
        checkboxContainer.className = 'checkbox-container';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'present-checkbox';
        checkboxContainer.appendChild(checkbox);
        presentCell.appendChild(checkboxContainer);

        row.appendChild(rollCell);
        row.appendChild(nameCell);
        row.appendChild(presentCell);

        tableBody.appendChild(row);
    });
});

async function saveAsPDF() {
    const { jsPDF } = window.jspdf;

    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const amPm = document.getElementById('amPm').value;
    const className = document.getElementById('className').value;
    const classType = document.getElementById('classType').value;

    const doc = new jsPDF();

    // Image URL
    const imageUrl = 'https://upload.wikimedia.org/wikipedia/en/e/e3/Narula_Institute_of_Technology_logo.png'; // Replace with your actual image URL

    // Fetch the image and convert it to base64
    const fetchImageAsBase64 = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    };

    try {
        const imgData = await fetchImageAsBase64(imageUrl);

        // Define image dimensions
        const imgWidth = 40; // Increased width
        const imgHeight = 30; // Adjust height proportionally

        // PDF width is 210 mm; shifting 20% to the left from the right edge
        const xOffset = 210 - imgWidth - (210 * 0.10); // 20% of PDF width

        // Add the image to the PDF
        doc.addImage(imgData, 'PNG', xOffset, 10, imgWidth, imgHeight);

        // Add the "Program designed by Avijit Bhadra" text below the image
        doc.setFontSize(10); // Adjust font size as needed
        const textXOffset = xOffset; // Align text with the image
        const textYOffset = 10 + imgHeight + 5; // Position text below the image with some margin
        doc.text('Program designed by Deepta Roy', textXOffset, textYOffset);

        doc.setFontSize(18);
        doc.text(`Date: ${date}`, 10, 10);
        doc.text(`Time: ${time} ${amPm}`, 10, 20);
        doc.text(`Class Name: ${className}`, 10, 30);
        doc.text(`Class Type: ${classType}`, 10, 40);

        const presentStudents = [];
        const absentStudents = [];

        const checkboxes = document.querySelectorAll('.present-checkbox');
        checkboxes.forEach((checkbox, index) => {
            const student = students[index];
            if (checkbox.checked) {
                presentStudents.push([student.roll, student.name]);
            } else {
                absentStudents.push([student.roll, student.name]);
            }
        });

        if (presentStudents.length > 0) {
            doc.setFontSize(16);
            doc.text('Present Students:', 10, 50);
            doc.autoTable({
                startY: 60,
                head: [['Roll Number', 'Name']],
                body: presentStudents,
            });
        }

        if (absentStudents.length > 0) {
            const startY = doc.autoTable.previous.finalY + 10;
            doc.setFontSize(16);
            doc.text('Absent Students:', 10, startY);
            doc.autoTable({
                startY: startY + 10,
                head: [['Roll Number', 'Name']],
                body: absentStudents,
            });
        }

        // Construct filename
        const filename = `${className}_${classType}_${date}_${time.replace(':', '-')}_${amPm}.pdf`;

        doc.save(filename);
    } catch (error) {
        console.error('Failed to load image', error);
    }
}

const footer = document.getElementById('footer');

setInterval(() => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    footer.style.color = randomColor;
}, 1000);
