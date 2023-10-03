//Libraries


//components
import "./offer.css"

const Offer = () => {
    return (
        <div class="grid-container">
            <div class="grid-item">
                <h3 style={{marginBottom: 0, color:"#36393d"}}>Cashback</h3>
                <p style={{fontSize: 14}}>Bank Offer 5% Unlimited Cashback on Axis Bank Credit Card</p>
            </div>
            <div class="grid-item">
                <h3 style={{marginBottom: 0, color:"#36393d"}}>Bank Offer</h3>
                <p style={{fontSize: 14}}>10% Off on Bank of Baroda Mastercard debit card first time transaction, Terms and Condition apply</p>
            </div>
            <div class="grid-item">
                <h3 style={{marginBottom: 0, color:"#36393d"}}>Flat ₹3000</h3>
                <p style={{fontSize: 14}}>Flat ₹3,000 Off on HDFC Bank Credit Card EMI Trxns on orders priced between ₹40,000 to ₹49,999T&C</p>
            </div>
            <div class="grid-item">
                <h3 style={{marginBottom: 0, color:"#36393d"}}>No Cost EMI</h3>
                <p style={{fontSize: 14}}>Avail No Cost EMI on select cards for orders above ₹3000</p>
            </div>
        </div>
    )
}

export default Offer;