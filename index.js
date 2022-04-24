const express = require("express");
const pincodes = require("./Pincodes.json");
const app = express();
app.use(express.json());

const rateData = {
    forward: {
        a: {
            first: 29.5,
            additional: 23.6
        },
        b: {
            first: 33,
            additional: 28.3
        },
        c: {
            first: 40.1,
            additional: 38.9
        },
        d: {
            first: 45.4,
            additional: 44.8
        },
        e: {
            first: 56.6,
            additional: 55.5
        },
    },
    rto: {
        a: {
            first: 43.1,
            additional: 47.2
        },
        b: {
            first: 53.5,
            additional: 56.6
        },
        c: {
            first: 72,
            additional: 77.8
        },
        d: {
            first: 86.7,
            additional: 89.6
        },
        e: {
            first: 107.3,
            additional: 111
        },
    },
};





app.get("/", (req, res) => {
    const pin = `${req.body.pin}`;
    const weight = +req.body.weight;
    const deliveryType = req.body.deliveryType;
    if (!validatePin(pin)) {
        res.send("Invalid PIN : Delivery not available on this pincode");
    } else {

        const zone = validatePin(pin);
        const cost = findCost(deliveryType, zone, weight);
        res.send({ "totalCost": cost });
    }
})

function findCost(deliveryType, zone, weight) {
    let roundedWeight = Math.round(weight / 0.5) * 0.5;
    let multiples = roundedWeight / 0.5;
    let additionalWeightMultiples = multiples - 1;

    let finalcost1 = rateData[deliveryType][zone].first;
    let finalcost2 = rateData[deliveryType][zone].additional;

    if (multiples == 1) {
        return finalcost1;
    } else return finalcost1 + (finalcost2 * additionalWeightMultiples);
}

function validatePin(pin) {
    let newP = pin.toString();
    if (pincodes[0][newP]) {
        return pincodes[0][newP];
    } else return false;
}
const port = process.env.PORT || 5000;
app.listen(5000, function() {
    console.log("listening on port ", port)
})