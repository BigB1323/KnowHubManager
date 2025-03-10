const {Client, Interaction, MessageFlags} = require("discord.js");
const {memberRole} = require("../../../config.json");
const UserData = require("../../../models/userData");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if(interaction.isButton()) {
        if(interaction.customId === "verify") {
            const query = {
                userID: interaction.user.id,
            };

            const userData = await UserData.findOne(query);

            if(userData) {
                interaction.reply({
                    content: "You are already verified!",
                    flags: MessageFlags.Ephemeral,
                });
                return;
            };

            const user = await interaction.guild.members.fetch(interaction.user.id);
            const memberRole2 = await interaction.guild.roles.fetch(memberRole);
            await user.roles.add(memberRole2);

            const newData = new UserData({
                userID: interaction.user.id,
            });

            newData.save();
        };
    };
};