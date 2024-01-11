<template>
    <div class="history-layout">
        <div class="history-content px-5 pb-5 pt-2">
            <v-col class=" d-flex justify-center align-center text-center">
                <v-row>
                    <h3>Activity overview</h3>
                </v-row>
                <v-row class="ma-0 justify-end">
                    <v-btn class="mr-2" icon variant="solo" @click="downloadFile('monthly-events')" elevation="1">
                        <v-icon icon="mdi-file-table" size="30" color="blue-darken-2"></v-icon>
                        <v-tooltip activator="parent" location="bottom">Download monthly events PDF</v-tooltip>
                    </v-btn>
                    <v-btn icon variant="solo" @click="downloadFile('grouped-monthly-events')" elevation="1">
                        <v-icon icon="mdi-file-chart" size="30" color="#D14343"></v-icon>
                        <v-tooltip activator="parent" location="bottom">Download grouped events PDF</v-tooltip>
                    </v-btn>
                </v-row>
            </v-col>
            <table class="history-table">
                <thead>
                    <tr>
                        <th style="width: 130px;">Event</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Duration</th>
                        <th style="width: 110px;">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(event, index) in events" :key="index">
                        <td class="chip-cell">
                            <v-chip class="chip-stlye" :color="getEventTypeColor(event.type)">{{ event.type }}</v-chip>
                        </td>
                        <td>{{ event.date }}</td>
                        <td>{{ event.startTime }} - {{ event.endTime }}</td>
                        <td>{{ event.duration }}</td>
                        <td>
                            <v-icon class="action-btn mr-2" color="blue"
                                @click="editEvent(event, index)">mdi-pencil</v-icon>
                            <v-icon class="action-btn" color="red">mdi-delete</v-icon>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <v-dialog class="add-user-modal-dialog" v-model="editEventDialog">
            <v-card class="add-user-modal-card pa-5">
                <v-row class="text-center">
                    <v-col>
                        <h3>Edit event</h3>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <div class="pl-1 text-subtitle-2 text-medium-emphasis text-left">
                            EVENT
                        </div>
                        <v-select variant="solo" :class="selectClass" v-model="tempEvent.selectedOption"
                            :items="['Work', 'Remote', 'Break', 'Lunch', 'Stop']"></v-select>
                    </v-col>
                    <v-col>
                        <div class="pl-1 text-subtitle-2 text-medium-emphasis text-left">
                            DATE
                        </div>
                        <v-text-field v-model="tempEvent.selectedDate" variant="solo" rounded="lg"
                            bg-color="rgba(255, 255, 255, 0.02)" @click="showDatePicker = true"></v-text-field>
                        <v-dialog v-model="showDatePicker">
                            <v-date-picker color="primary"
                               ></v-date-picker>
                        </v-dialog>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <div class="pl-1 text-subtitle-2 text-medium-emphasis text-left">
                            START TIME
                        </div>
                        <v-text-field v-model="tempEvent.startTime" variant="solo" rounded="lg" type="time"
                            suffix="PST"></v-text-field>
                    </v-col>
                    <v-col>
                        <div class="pl-1 text-subtitle-2 text-medium-emphasis text-left">
                            END TIME
                        </div>
                        <v-text-field v-model="tempEvent.endTime" variant="solo" rounded="lg" type="time"
                            suffix="PST"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <div class="pl-1 text-subtitle-2 text-medium-emphasis text-left">
                            NOTES
                        </div>
                        <v-textarea v-model="tempEvent.notes" variant="solo" rounded="lg"
                            placeholder="Write down any work related notes."></v-textarea>
                    </v-col>
                </v-row>

                <v-card-actions class="d-flex justify-end">
                    <v-btn color="primary" variant="flat" @click="(openEditEventDialog()), clearData()">Cancel</v-btn>
                    <v-btn color="primary" variant="flat" @click="saveEvent()">Save event</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import RequestService from '@/services/request.service';
import { saveAs } from 'file-saver';

export default {
    data() {
        return {
            editEventDialog: false,
            showDatePicker: false,
            selectedDate: null,
            tempEvent: {
                id: null,
                selectedOption: '',
                selectedDate: null,
                start_time: '',
                end_time: '',
                duration: '',
                notes: '',
            },
            eventTypeColors: {
                'Work': '#14B8A6',
                'Remote': '#FAC748',
                'Break': '#FFB020',
                'Lunch': '#AB5FD4',
                'Stop': '#D14343',
            },
            events: [
                { id: 1, type: 'Work', date: '8.1.2024', startTime: '07:00:00', endTime: '09:48:58', duration: '02:48:58', notes: '' },
                { id: 2, type: 'Break', date: '8.1.2024', startTime: '09:48:58', endTime: '10:00:00', duration: '00:11:02', note: '' },
                { id: 3, type: 'Lunch', date: '8.1.2024', startTime: '10:00:00', endTime: '10:35:00', duration: '00:35:00', note: '' },
                { id: 4, type: 'Remote', date: '8.1.2024', startTime: '07:00:00', endTime: '09:48:58', duration: '02:48:58', note: '' },
                { id: 5, type: 'Stop', date: '8.1.2024', startTime: '09:48:58', endTime: '10:00:00', duration: '00:11:02', note: '' },
                { id: 6, type: 'Work', date: '8.1.2024', startTime: '07:00:00', endTime: '09:48:58', duration: '02:48:58', note: '' },
                { id: 7, type: 'Break', date: '8.1.2024', startTime: '09:48:58', endTime: '10:00:00', duration: '00:11:02', note: '' },
                { id: 8, type: 'Lunch', date: '8.1.2024', startTime: '10:00:00', endTime: '10:35:00', duration: '00:35:00', note: '' },
                { id: 9, type: 'Remote', date: '8.1.2024', startTime: '07:00:00', endTime: '09:48:58', duration: '02:48:58', note: '' },
                { id: 10, type: 'Stop', date: '8.1.2024', startTime: '09:48:58', endTime: '10:00:00', duration: '00:11:02', note: '' },
                { id: 11, type: 'Work', date: '8.1.2024', startTime: '07:00:00', endTime: '09:48:58', duration: '02:48:58', note: '' },
                { id: 12, type: 'Break', date: '8.1.2024', startTime: '09:48:58', endTime: '10:00:00', duration: '00:11:02', note: '' },
                { id: 13, type: 'Lunch', date: '8.1.2024', startTime: '10:00:00', endTime: '10:35:00', duration: '00:35:00', note: '' },
                { id: 14, type: 'Remote', date: '8.1.2024', startTime: '07:00:00', endTime: '09:48:58', duration: '02:48:58', note: '' },
                { id: 15, type: 'Stop', date: '8.1.2024', startTime: '09:48:58', endTime: '10:00:00', duration: '00:11:02', note: '' },
                { id: 16, type: 'Work', date: '8.1.2024', startTime: '07:00:00', endTime: '09:48:58', duration: '02:48:58', note: '' },
                { id: 17, type: 'Break', date: '8.1.2024', startTime: '09:48:58', endTime: '10:00:00', duration: '00:11:02', note: '' },
                { id: 18, type: 'Lunch', date: '8.1.2024', startTime: '10:00:00', endTime: '10:35:00', duration: '00:35:00', note: '' },
                { id: 19, type: 'Remote', date: '8.1.2024', startTime: '07:00:00', endTime: '09:48:58', duration: '02:48:58', note: '' },
                { id: 20, type: 'Stop', date: '8.1.2024', startTime: '09:48:58', endTime: '10:00:00', duration: '00:11:02', note: '' },
            ],
        };
    },
    methods: {
        async downloadFile(report) {
            const response = await RequestService.get(`services/v1/reports/${report}`, null, null, 'blob');
            console.log(response.data)
            const blob = new Blob([response], { type: 'application/pdf' });
            saveAs(blob, `${report}.pdf`);
        },
        openEditEventDialog() {
            this.editEventDialog = !this.editEventDialog;
        },
        editEvent(event) {
            this.editEventDialog = true;
            this.tempEvent = {
                id: event.id,
                selectedOption: event.type,
                selectedDate: event.date,
                startTime: event.startTime,
                endTime: event.endTime,
                duration: event.duration,
                notes: event.notes || '',
            };
        },
        saveEvent() {
            let event = this.events.find(e => e.id === this.tempEvent.id);
            if (event) {
                event.type = this.tempEvent.selectedOption;
                event.color = this.eventTypeColors[this.tempEvent.selectedOption];
                event.date = this.tempEvent.selectedDate;
                event.startTime = this.tempEvent.startTime;
                event.endTime = this.tempEvent.endTime;
                event.duration = this.calculateDuration(this.tempEvent.startTime, this.tempEvent.endTime);
                event.notes = this.tempEvent.notes;
            }
            this.editEventDialog = false;
        },
        calculateDuration(startTime, endTime) {
            let start = new Date(`1970/01/01 ${startTime}`);
            let end = new Date(`1970/01/01 ${endTime}`);
            if (end < start) {
                end.setDate(end.getDate() + 1);
            }
            let diff = end - start;
            let hours = Math.floor(diff / 3600000);
            let minutes = Math.floor((diff % 3600000) / 60000);
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        },
        clearData() {
            this.tempEvent = {
                id: null,
                selectedOption: '',
                selectedDate: null,
                start_time: '',
                end_time: '',
                duration: '',
                notes: '',
            };
            this.editEventDialog = false;
        },
        getEventTypeColor(type) {
            return this.eventTypeColors[type] || 'defaultColor';
        },
    },
};
</script>


<style>
.history-layout {
    height: 100vh;
    background-color: #eeeff2;
    padding: 25px 25px;
}

.history-content {
    flex-grow: 1;
    background-color: white;
    border-radius: 15px;
}

.history-table {
    width: 100%;
}

.history-table tr:hover {
    background-color: #d4d7df;
}

.history-table,
thead,
tbody,
tr,
th,
td {
    border: none !important;
    border-spacing: 0px !important;
}

.history-table th {
    height: 50px;
    background-color: #ebecf3;
}

.chip-cell {
    display: flex;
    justify-content: center;
    align-items: center;
}

.chip-cell .v-chip {
    font-weight: bold !important;
    text-align: center;
    display: flex;
    justify-content: center;
    width: 80px;
    height: 30px !important;
    margin: 2px;
}

.history-table tr:nth-child(even) {
    background-color: #eeeff3;
}

.history-table tr:nth-child(even):hover {
    background-color: #d4d7df;
}

.action-btn {
    cursor: pointer;
}

.action-btn:hover {
    opacity: 0.7;
}
</style>