import dayjs from 'dayjs';

export default function( rows ){
	return rows.map( rental => {
		const formatedRental = {
			...rental, 
			customer :  {
				id : rental.rentCustomerId,
				name : rental.customerName
			},
			game : {
				id : rental.rentedGameId,
				name : rental.rentedGameName
			},
			rentDate : dayjs( rental.rentDate ).format( 'YYYY-MM-DD' ),
			returnDate : rental.returnDate ? dayjs( rental.returnDate ).format( 'YYYY-MM-DD' ) : rental.returnDate
		};
  
		delete formatedRental.rentedGameName;
		delete formatedRental.rentedGameId;
		delete formatedRental.customerName;
		delete formatedRental.rentCustomerId;
  
		return formatedRental;
    
	} );
}