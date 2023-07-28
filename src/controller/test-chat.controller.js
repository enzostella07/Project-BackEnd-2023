class testChatController{
  testChat = (req, res) => {
    return res.status(200).render("test-chat", {});
  };
}
export default new testChatController()

