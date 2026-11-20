import { howToFaq } from '@/data/how-to';

export function HowToFaq() {
	return (
		<section className="how-to-faq" aria-label="Frequently asked questions">
			<div className="faq-list">
				{howToFaq.map((item, index) => (
					<div className="faq-item" key={item.q}>
						<h3>
							<span>{String(index + 1).padStart(2, '0')}</span>
							{item.q}
						</h3>
						<p>{item.a}</p>
					</div>
				))}
			</div>
		</section>
	);
}
