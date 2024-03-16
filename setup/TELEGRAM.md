# Telegram
This is an **OPTIONAL** feature. If you want to receive a Telegram notification when the check-in is successful, you can create a Telegram bot and add it to the `config.js` file.

1. Go to [@BotFather](https://t.me/BotFather) and type `/newbot`.
2. Create a name for your bot
    - Such as `Honkai Star-Rail`
3. Create a username for your bot. (Must end with `bot` or `_bot`)
    - Such as `HonkaiStarRailBot` or `HonkaiStarRail_bot`
4. If all goes well, you should receive a message that will look like this:
    ```
    Done! Congratulations on your new bot. You will find it at t.me/HonkaiStarRailBot. You can now add a description, about section and profile picture for your bot, see /help for a list of commands. By the way, when you've finished creating your cool bot, ping our Bot Support if you want a better username for it. Just make sure the bot is fully operational before you do this.
    ```
5. On the same message, you will see a `token` that looks like this:
    ```
    123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ
    ```
6. Paste the `token` into the `token` Telegram  field at the `config.js` file.
7. Next you need to get your `chatId`. You can send a message to [@getmyid_bot](https://t.me/getmyid_bot) and it will reply with your `chatId`.
8. You will receive a message that will look like this:
    ```
    Your user ID: 123456789
    ```
9. Paste your user ID into the `chatId` Telegram field at the `config.js` file.
10. You should receive a Telegram notification when the check-in is successful.
    ![](https://i.imgur.com/qsRLPq2.png)
11. And if you enable stamina check, you should receive a Telegram notification when your stamina is above your set threshold and when it capped.
    ![](https://i.imgur.com/PLNlzgs.png)
12. You can also send a bot command to check your current stamina by sending `/stamina` to your bot.
    ![](https://i.imgur.com/hqUTXWl.png)
13. Or you can also check your current expedition status by sending `/expedition` to your bot.
    ![](https://i.imgur.com/ppDxJAD.png)