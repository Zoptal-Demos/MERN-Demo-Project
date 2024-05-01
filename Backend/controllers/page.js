const pageModel = require('../models/pages');
const helpAndSupport = require('../models/helpnsupport');

const pageController = {
    terms: async (req, res) => {
        try {
            // 1 for terms and conditions
            let data = await pageModel.findOne({ type : 1 });
            data != null ? res.render('terms',{data}) : res.send("No data found")
        } catch (err) {
            res.send({
                status: false,
                code: 400,
                message: "Internal Server error"
            })
        }
    },
    privacy: async (req, res) => {
        try {
            // 1 for terms and conditions
            let data = await pageModel.findOne({ type : 2 });
            data != null ? res.render('privacy',data) : res.send("No data found")
        } catch (err) {
            res.send({
                status: false,
                code: 400,
                message: "Internal Server error"
            })
        }
    },
    about: async (req, res) => {
        try {
            // 1 for terms and conditions
            let data = await pageModel.findOne({ type : 3 });
            data != null ? res.render('about',data) : res.send("No data found")
        } catch (err) {
            res.send({
                status: false,
                code: 400,
                message: "Internal Server error"
            })
        }
    },
    updatePage: async (req, res) => {
        try {
            // 1 for terms and conditions, 2 for privacy and policy, 3 about us
            await pageModel.findOneAndUpdate({ type : parseInt(req.params.type) },{$set : req.body},{new : true, lean : true, upsert : true});
            res.send({
                status: true,
                code: 200,
                message: "Content updated successfully"
            });
        } catch (err) {
            res.send({
                status: false,
                code: 400,
                message: "Internal Server error"
            })
        }
    },
    helpAndSupport: async (req, res) => {
        try {
            // 1 for terms and conditions, 2 for privacy and policy, 3 about us
            await helpAndSupport(req.body).save();
            res.send({
                status: true,
                code: 200,
                message: "You query has been recorded successfully, we will get in touch soon"
            });
        } catch (err) {
            res.send({
                status: false,
                code: 400,
                message: "Internal Server error"
            })
        }
    }
}

module.exports = pageController;