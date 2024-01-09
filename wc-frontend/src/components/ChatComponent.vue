<template>
    <div class="message-container">
        <v-list-item v-for="(msg, index) in messages" :key="index" class="mb-2 message-content">
            <v-list-item-title class="text-left">
                <span class="font-weight-bold">{{ msg.userName }}</span>
                <span class="ml-2" style="color: rgb(200, 200, 200); font-size: 0.9em">
                    {{ msg.datetime }} at {{ msg.time }}
                </span>
            </v-list-item-title>
            <v-list-item-subtitle style="opacity: 1 !important" class="text-left">
                <span>{{ msg.message }}</span>
            </v-list-item-subtitle>
        </v-list-item>
    </div>
</template>

<script>

export default {
    name: 'ChatComponent',
    data: () => ({
        messages: [
            { userName: 'Brina', message: 'Hello there!', datetime: '09/01/2024', time: '17:00' },
            { userName: 'John', message: 'Hi, Brina!', datetime: '09/01/2024', time: '17:02' },
            { userName: 'Brina', message: 'YOUR MOM!', datetime: '09/01/2024', time: '17:03' },
            { userName: 'John', message: ':(', datetime: '09/01/2024', time: '17:03' },
            { userName: 'Brina', message: 'Ahahahahaha', datetime: '09/01/2024', time: '17:03' },
            { userName: 'John', message: '...', datetime: '09/01/2024', time: '17:03' },
            { userName: 'Brina', message: ':)', datetime: '09/01/2024', time: '17:04' },
            { userName: 'Brina', message: ':)', datetime: '09/01/2024', time: '17:04' },
            { userName: 'Brina', message: ':)', datetime: '09/01/2024', time: '17:04' },
            { userName: 'Brina', message: ':)', datetime: '09/01/2024', time: '17:04' },
        ],
    }),
}

</script>


<style>
.message-container {
  overflow-y: auto;
  padding: 10px 0px;
}

.message-content{
    background-color: #5048E4 !important;
    border-radius: 15px !important;
    padding: 5px 10px !important;
    color: white !important; 
}

</style>