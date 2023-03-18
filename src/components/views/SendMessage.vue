<template>
    <div class="send-message">
        <input type="text" class="input" placeholder="Start typing..." autocomplete="off">
        <input class="send-btn" value="Send" type="submit">
    </div>
</template>

<style scoped>
.send-message {
    position: sticky;
    bottom: 10px;
    display: flex;
    align-items: center;
    margin-top: 10px;
}


.input {
    flex: 1;
    min-height: 50px;
    padding: 0 1rem;
    color: #fff;
    font-size: 15px;
    border: 1px solid #5e4dcd;
    border-radius: 6px 0 0 6px;
    background-color: transparent;
}

.send-btn {
    min-height: 50px;
    padding: .5em 1em;
    border: none;
    border-radius: 0 6px 6px 0;
    background-color: #5e4dcd;
    color: #fff;
    font-size: 15px;
    cursor: pointer;
    transition: background-color .3s ease-in-out;
}

.send-btn:hover {
    background-color: #5e5dcd;
}

.input:focus,
.input:focus-visible {
    border-color: #3898EC;
    outline: none;
}
</style>