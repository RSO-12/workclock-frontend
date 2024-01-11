<template>
    <div class="admin-layout">
        <v-container>
            <v-row>
                <v-col class="control-panel-card mx-15">
                    User stats
                </v-col>
                <v-col class="control-panel-card">
                    Company stats
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

export default {
    name: 'AdminControlPanelComponent',
    data: () => ({
        errors: [],
    }),
    methods: {

    },
    computed: {
        
    },
}
</script>

<style>
.admin-layout {
    height: 100vh;
    background-color: #eeeff2;
}

.control-panel-card {
    background-color: white;
    border-radius: 15px;
}



</style>