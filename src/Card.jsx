function Card({ card, handleChoice, flipped, disabled }) {
	const handleClick = () => {
		if (!disabled && !flipped) handleChoice(card);
	};

	return (
		<div className='relative w-20 h-28 cursor-pointer' onClick={handleClick}>
			<div className={`w-full h-full transition-transform duration-300 ${flipped ? 'rotate-y-180' : ''}`}>
				{flipped ? (
					<img src={card.src} alt='card front' className='w-full h-full object-cover rounded-lg' />	
				) : (
					<div className='bg-purple-500 w-full h-full rounded-lg flex items-center justify-center text-white font-bold text-xl'>
						?
					</div>
				)}
			</div>
		</div>
	);
}

export default Card;