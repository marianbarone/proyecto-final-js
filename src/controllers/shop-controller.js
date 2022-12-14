

const userInfo = (req, res, next) => {
    req.userInfo = req.isAuthenticated()
        ? {
            avatar: req.user.avatar,
            email: req.user.email,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            role: req.user.role,
            address: req.user.address,
            tel: req.user.tel
        }
        : {
            avatar:
                "https://olhardigital.com.br/uploads/acervo_imagens/2017/06/20170609141843_660_420.jpg",
            email: null,
            firstName: "anonimo",
            lastName: "",
            role: "invitado",
            address: "",
            tel: ""
        };
    next();
}

const getCart = (req, res) => {
    res.render("cart.ejs", req.userInfo);
};

export default {
    getCart, 
    userInfo
}