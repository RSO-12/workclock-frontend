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
                            <v-chip class="chip-stlye" :color="event.color">{{ event.type }}</v-chip>
                        </td>
                        <td>{{ event.date }}</td>
                        <td>{{ event.startTime }} - {{ event.endTime }}</td>
                        <td>{{ event.duration }}</td>
                        <td>
                            <v-icon class="action-btn mr-2" color="blue">mdi-pencil</v-icon>
                            <v-icon class="action-btn" color="red">mdi-delete</v-icon>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <v-dialog class="add-user-modal-dialog" v-model="editEventDialog">
            <v-card class="add-user-modal-card pa-5">
                <v-card-text class="pa-0 ma-0 text-center">
                    <h3>Edit event</h3>
                </v-card-text>

                <v-row>
                    <v-col>
                        <div class="pl-1 text-subtitle-2 text-medium-emphasis text-left">
                            EVENT
                        </div>
                        <v-select class="select-menu" :class="selectClass" v-model="selectedOption"
                            :items="['Start', 'Work', 'Remote', 'Break', 'Lunch', 'Stop']" dense rounded solo
                            hide-details></v-select>
                    </v-col>
                </v-row>

                <v-card-actions class="d-flex justify-end">
                    <v-btn color="primary" variant="flat" @click="clearData()">Cancel</v-btn>
                    <v-btn color="primary" variant="flat" @click="addUser()">Add user</v-btn>
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
            editEventDialog: true,
            events: [
                { type: 'Work', color: '#14B8A6', date: '8.1.2024', startTime: '07:00:00', endTime: '09:48:58', duration: '02:48:58' },
                { type: 'Break', color: '#FFB020', date: '8.1.2024', startTime: '09:48:58', endTime: '10:00:00', duration: '00:11:02' },
                { type: 'Lunch', color: '#AB5FD4', date: '8.1.2024', startTime: '10:00:00', endTime: '10:35:00', duration: '00:35:00' },
                { type: 'Remote', color: '#FAC748', date: '8.1.2024', startTime: '07:00:00', endTime: '09:48:58', duration: '02:48:58' },
                { type: 'Stop', color: '#D14343', date: '8.1.2024', startTime: '09:48:58', endTime: '10:00:00', duration: '00:11:02' },
                { type: 'Work', color: '#14B8A6', date: '8.1.2024', startTime: '07:00:00', endTime: '09:48:58', duration: '02:48:58' },
                { type: 'Break', color: '#FFB020', date: '8.1.2024', startTime: '09:48:58', endTime: '10:00:00', duration: '00:11:02' },
                { type: 'Lunch', color: '#AB5FD4', date: '8.1.2024', startTime: '10:00:00', endTime: '10:35:00', duration: '00:35:00' },
                { type: 'Remote', color: '#FAC748', date: '8.1.2024', startTime: '07:00:00', endTime: '09:48:58', duration: '02:48:58' },
                { type: 'Stop', color: '#D14343', date: '8.1.2024', startTime: '09:48:58', endTime: '10:00:00', duration: '00:11:02' },
                { type: 'Work', color: '#14B8A6', date: '8.1.2024', startTime: '07:00:00', endTime: '09:48:58', duration: '02:48:58' },
                { type: 'Break', color: '#FFB020', date: '8.1.2024', startTime: '09:48:58', endTime: '10:00:00', duration: '00:11:02' },
                { type: 'Lunch', color: '#AB5FD4', date: '8.1.2024', startTime: '10:00:00', endTime: '10:35:00', duration: '00:35:00' },
                { type: 'Remote', color: '#FAC748', date: '8.1.2024', startTime: '07:00:00', endTime: '09:48:58', duration: '02:48:58' },
                { type: 'Stop', color: '#D14343', date: '8.1.2024', startTime: '09:48:58', endTime: '10:00:00', duration: '00:11:02' },
                { type: 'Work', color: '#14B8A6', date: '8.1.2024', startTime: '07:00:00', endTime: '09:48:58', duration: '02:48:58' },
                { type: 'Break', color: '#FFB020', date: '8.1.2024', startTime: '09:48:58', endTime: '10:00:00', duration: '00:11:02' },
                { type: 'Lunch', color: '#AB5FD4', date: '8.1.2024', startTime: '10:00:00', endTime: '10:35:00', duration: '00:35:00' },
                { type: 'Remote', color: '#FAC748', date: '8.1.2024', startTime: '07:00:00', endTime: '09:48:58', duration: '02:48:58' },
                { type: 'Stop', color: '#D14343', date: '8.1.2024', startTime: '09:48:58', endTime: '10:00:00', duration: '00:11:02' },
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