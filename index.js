const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let inspections = [];

app.post('/login', (req, res) => {
    const { inspectorId } = req.body;
    // Validate inspectorId
    res.json({ message: 'Login successful' });
});

app.post('/inspect', (req, res) => {
    const inspection = req.body;
    inspection.id = inspections.length + 1;
    inspections.push(inspection);
    saveInspectionsToCSV();
    res.json({ message: 'Inspection saved successfully', id: inspection.id });
});

const saveInspectionsToCSV = () => {
    const csvContent = inspections.map(inspection => 
        `${inspection.id},${inspection.inspectorName},${inspection.inspectionEmployeeId},${inspection.dateTime},${inspection.location},${inspection.geoCoordinates},${inspection.serviceMeterHours},${inspection.inspectorSignature},${inspection.customerName},${inspection.catCustomerId},${inspection.batteryMake},${inspection.batteryReplacementDate},${inspection.batteryVoltage},${inspection.batteryWaterLevel},${inspection.batteryCondition},${inspection.batteryLeakRust},${inspection.batterySummary}`
    ).join('\n');
    fs.writeFileSync(path.join(__dirname, 'inspections.csv'), csvContent);
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
