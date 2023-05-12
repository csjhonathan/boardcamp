import dayjs from 'dayjs';

export default function rentalsFormater( rows ){
	return rows.map( rental => {
		
		const formatedRental = {
			id : rental.id,
			customerId : rental.customerId,
			gameId : rental.gameId,
			rentDate : dayjs( rental.rentDate ).format( 'YYYY-MM-DD' ),
			daysRented: rental.daysRented,
			returnDate : rental.returnDate ? dayjs( rental.returnDate ).format( 'YYYY-MM-DD' ) : rental.returnDate,
			originalPrice: rental.originalPrice,
			delayFee: rental.delayFee, 
			customer :  {
				id : rental.rentCustomerId,
				name : rental.customerName
			},
			game : {
				id : rental.rentedGameId,
				name : rental.rentedGameName
			}};

		return formatedRental;
    
	} );
}