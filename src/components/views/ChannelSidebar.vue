<template>
    <aside class="sidebar">
        <nav>
            <div class="channel">JD</div>
            <div class="channel">MK</div>
            <div class="channel">AK</div>
        </nav>
    </aside>
</template>

<style scoped>
.sidebar {
    width: 50px;
    background-color: #2e283f;
}

nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px 0;
}

.channel {
    background-color: crimson;
    color: whitesmoke;
    font-size: 14px;
    border-radius: 50%;
    font-weight: bold;
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
    cursor: pointer;
    transition: all 0.5s ease;
}

.channel:hover {
    scale: 1.03;
    box-shadow: 1px 1px 8px rgba(172, 255, 47, 0.5);
}
</style>