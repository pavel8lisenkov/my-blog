import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Post {
	id: number;
	title: { rendered: string };
	excerpt: { rendered: string };
	meta: {
		nanoId: string;
	};
}

function Home() {
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		fetch('http://localhost:8888/myblog/wp-json/wp/v2/posts')
			.then(r => r.json())
			.then((data: Post[]) => setPosts(data));
	}, []);

	return (
		<div>
			<h1>Посты блога</h1>
			<ul>
				{posts.map(post => (
					<li key={post.id}>
						<h2>
							<Link to={`/post/${post.meta.nanoId}`}>
								{post.title.rendered}
							</Link>
						</h2>
						<div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
					</li>
				))}
			</ul>
		</div>
	);
}

export default Home;
