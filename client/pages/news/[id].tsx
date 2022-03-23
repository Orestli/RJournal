import { GetServerSideProps, NextPage } from 'next';
import { MainLayout } from '../../layouts/MainLayout';
import { FullPost } from '../../components/FullPost';
import PostComments from '../../components/PostComments';
import { Api } from '../../utils/api';
import { PostItem } from '../../utils/api/types';

interface PostProps {
  post: PostItem;
}

const Post: NextPage<PostProps> = ({ post }) => {
  return (
    <MainLayout className="mb-50" contentFullWidth>
      <FullPost title={post.title} blocks={post.body} />
      <PostComments postId={post.id} />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const id = ctx.params?.id || 0;
    const post = await Api(ctx).post.getOne(+id);

    return {
      props: {
        post,
      },
    };
  } catch (err) {
    console.log('Post page ', err);

    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default Post;
