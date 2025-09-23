import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

interface Post {
	id: number;
	title: { rendered: string };
	content: { rendered: string };
	meta: {
		nanoId: string;
	};
}

function PostPage() {
	const { nanoId } = useParams<{ nanoId: string }>();
	const [post, setPost] = useState<Post | null>(null);

	useEffect(() => {
		if (nanoId) {
			fetch(
				`http://localhost:8888/myblog/wp-json/wp/v2/posts?meta_key=nanoId&meta_value=${nanoId}`
			)
				.then(r => r.json())
				.then((data: Post[]) => setPost(data[0]));
		}
	}, [nanoId]);

	if (!post) return <p>Загрузка...</p>;

	return (
		<div>
			<h1>{post.title.rendered}</h1>
			<div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
			<p>
				<Link to='/'>← Назад к списку</Link>
			</p>
		</div>
	);
}

export default PostPage;
