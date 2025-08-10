import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

function Footer() {
  return (
    <footer className='bg-purple-800 text-white py-4 mt-8 fixed bottom-0 w-full'>
			<div className='container mx-auto flex justify-center gap-6 items-center'>
				<a href='https://github.com/JCesar206' target='_blank' rel='noopener noreferrer'>
					<FaGithub className='hover:text-green-500 transition' size={22}/>
				</a>
				<a href='https://' target='_blank' rel='noopener noreferrer'>
					<FaLinkedin className='hover:text-orange-500' size={22} />
				</a>
				<a href='mailto:jcesar206@hotmail.com'>
					<FaEnvelope className='hover:text-red-500 transition' size={22}/>
				</a>
			</div>
			<p className='text-center text-sm mt-2'>&copy; MemoryGame V 1.0 {new Date().getFullYear()} JulyDevops. Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;