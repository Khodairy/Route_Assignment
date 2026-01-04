//# Write your MySQL query statement below
let selution = `
SELECT Visits.customer_id, COUNT(Visits.visit_id) AS count_no_trans
FROM Visits 
left JOIN Transactions ON Visits.visit_id = Transactions.visit_id
WHERE Transactions.transaction_id IS NULL
GROUP BY Visits.customer_id;
`;
