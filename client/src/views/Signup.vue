<template>
    <div class="signup-page">
        <b-card bg-variant="light">
            <b-form-group label-cols-lg="3" label="Create An Account" label-size="lg"
                label-class="font-weight-bold pt-0" class="mb-10">
                <b-form-group label-for="nested-street" label-cols-sm="3" label-align-sm="right">
                    <b-form-input type="email" placeholder="Email Address"></b-form-input>
                </b-form-group>

                <b-form-group label-for="nested-city" label-cols-sm="3" label-align-sm="right">
                    <b-form-input type="text" class="a" placeholder="Username"></b-form-input>
                </b-form-group>

                <b-form-group label-for="nested-state" label-cols-sm="3" label-align-sm="right">
                    <b-form-input type="password" placeholder="Password"></b-form-input>
                </b-form-group>

                <b-form-group label-for="nested-country" label-cols-sm="3" label-align-sm="right">
                    <b-form-input type="password" placeholder="Confirm Password"></b-form-input>
                </b-form-group>
                <b-button id="btn" class="btn" pill variant="primary" type="submit">Create</b-button>
                <b-button pill type="reset">Clear</b-button>
            </b-form-group>
        </b-card>
    </div>
</template>

<style>
.signup-page {
    background-color: #183059;
}

.btn {
    margin: 1rem;
    display: block;
}

.mb-10 {
    display: block;
}

#btn {
    background-color: #F76E45;
}
</style>
