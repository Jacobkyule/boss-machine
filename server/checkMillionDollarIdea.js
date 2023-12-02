const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue  } = req.body;

    const checkPassed = () => (numWeeks * weeklyRevenue) >= 1000000;

    if(!checkPassed()){
        return res.status(400).send('The idea must be atleast one million dollar!!');
    }
    next();
};


// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
