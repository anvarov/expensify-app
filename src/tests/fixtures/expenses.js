import moment from "moment";

export default [
  { id: "1", description: "gum", amount: 145, createdAt: 0 },
  {
    id: "2",
    description: "coke",
    amount: 1459,
    createdAt: moment(0).subtract(4, "days").valueOf(),
  },
  {
    id: "3",
    description: "credit card",
    amount: 12000,
    createdAt: moment(0).subtract(8, "days").valueOf(),
  },
  {
    id: "4",
    description: "rent",
    amount: 445000,
    createdAt: moment(0).subtract(12, "days").valueOf(),
  },
];
