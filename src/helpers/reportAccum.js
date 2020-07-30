// helper functionality that serves as the accumulator for data used in CSV generation
class AccumEntry {

    constructor() {
        this.records = {};
        this.daysCount = 0;
    }    

    addDayRecord = (type, count) => {
        if (!this.records[type]) {
            this.records[type] = count;
        } else {
            this.records[type] += count;
        }
    }

    closeDay = () => {
        this.daysCount++;
    }
}

export class Accum {

    constructor(period, types) {
        this.period = period;
        this.entries = [];
        this.types = types;
    }

    addDayRecords = (all) => {
        for (let record of all) {
            this.__addDayRecordInternal(record.type, record.count);
        }
        this.entries[this.entries.length - 1].closeDay();
    }

    __addDayRecordInternal = (type, count) => {
        let currentEntry;
        if (!this.entries.length) {
            currentEntry = new AccumEntry(); 
            this.entries.push(currentEntry);
        } else {
            currentEntry = this.entries[this.entries.length - 1];
            if (currentEntry.daysCount === this.period) {
                currentEntry = new AccumEntry(); 
                this.entries.push(currentEntry);
            }
        }
        currentEntry.addDayRecord(type, count);
    }

    print = () => {
        const rows = [];
        const head = `Time-Frame,${this.types.join(',')}`;
        rows.push(head);
        let counter = 0 ;
        for (let entry of this.entries) {
            let row = `DAYS ${counter + 1} - ${counter + this.period},` + this.types.map(t => entry.records[t] || 0).map(v => ''+ v).join(',');
            rows.push(row);
            counter += this.period;
        }
        const report = rows.join('\n');
        return report;
    }
}