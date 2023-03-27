<script setup>
defineProps({
    label: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    required: Boolean,
    modelValue: String,
})

defineEmits(['update:modelValue'])

</script>

<template>
    <div class="input-field">
        <input :required="required" :type="type" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)" :placeholder="label">
        <label :for="name">{{ label }}</label>
    </div>
</template>

<style scoped>
.input-field {
    position: relative;
    padding: 20px 0 0;
    margin: 10px 0 20px;
    width: 100%;
    max-width: 180px;
}

input {
    font-family: inherit;
    width: 100%;
    border: none;
    border-bottom: 2px solid #9b9b9b;
    outline: 0;
    font-size: 17px;
    color: #fff;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
}

input::placeholder {
    color: transparent;
}

input:placeholder-shown~label {
    cursor: text;
    top: 20px;
}

label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 17px;
    color: #9b9b9b;
    pointer-events: none;
}

input:focus {
    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, #116399, #38caef);
    border-image-slice: 1;
}

input:focus~label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 17px;
    color: #38caef;
    font-weight: 700;
}

/* reset input */
input:required,
input:invalid {
    box-shadow: none;
}
</style>