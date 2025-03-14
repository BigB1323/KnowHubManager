const  { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits, GuildMember, EmbedBuilder, Guild, Colors, Message, MessageFlags, InteractionResponse } = require("discord.js");
const { callback } = require("../misc/ping");

module.exports = {
    name: "ban",
    description: "Bans a member from the server",
    //devonly: bool,
    //testonly: bool,
    deleted: false,
    options: [
        {
            name: "user",
            description: "The user to ban",
            required: true,
            type: ApplicationCommandOptionType.User,
        },
        {
            name: "reason",
            description: "Reason for banning",
            required: false,
            type: ApplicationCommandOptionType.String,
        }
    ],
    permissionRequired: [PermissionFlagsBits.BanMembers],

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {
        const targetUserId = await interaction.options.get("user").user.id;
        const reason = await interaction.options.get("reason")?.value || "No reason provided."

        const embed = new EmbedBuilder()
            .setTitle("You got banned!")
            .setDescription(`You got banned from ${interaction.guild.name} by ${interaction.user.globalName}\n**Reason: **${reason}`)
            .setColor(Colors.NotQuiteBlack);
            
        const targetUser = await interaction.guild.members.fetch(targetUserId).catch(err => {
            interaction.reply({
                content: "This user isnt in the server!",
                flags: MessageFlags.Ephemeral,
            });
            return;
        });            

        await targetUser.send({embeds: [embed]})

        await targetUser.ban({reason: reason});

        interaction.reply({
            content:"The user got banned!",
            flags: MessageFlags.Ephemeral,
        });
    }
}