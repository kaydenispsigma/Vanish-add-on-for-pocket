import { world } from "@minecraft/server";
import { Effect } from "@minecraft/server";  // Import Effect to check effects

world.beforeEvents.chatSend.subscribe((event) => {
    if (event.message === "/vanish") {
        event.cancel = true;  // Stop the message from appearing in the chat
        
        const player = event.sender;
        const invisibilityEffect = player.getEffects().find(effect => effect.id === Effect.invisibility);  // Check if the player has invisibility

        if (invisibilityEffect) {
            // If the player already has invisibility, remove invisibility
            player.runCommandAsync("effect @s clear invisibility");
            // Notify the world in yellow when a player exits vanish mode
            world.sendMessage(`§e${player.name} has joined the game.`);
        } else {
            // If the player does not have invisibility, apply invisibility
            player.runCommandAsync("effect @s invisibility 1000000 10 true");
            // Notify the world in yellow when a player enters vanish mode
            world.sendMessage(`§e${player.name} has left the game.`);
        }
    }
});
