import response from './response';

const request = options => {
    const { uri } = options;
    switch (true) {
        case /^https:\/\/www\.tiktok\.com\/@(\w+)\/video\/(\d+)$/.test(uri):
            return { body: response.videoMeta };
        case uri === 'https://www.tiktok.com/discover':
            return { body: response.tac };
        case /^https:\/\/m.tiktok.com\/node\/share\/user\/@(\w+)$/.test(uri): {
            const user = /^https:\/\/m.tiktok.com\/node\/share\/user\/@(\w+)$/.exec(uri);
            if (user) {
                return { body: response.user(user[1]) };
            }
            return { body: null };
        }
        case /^https:\/\/m.tiktok.com\/node\/share\/tag\/(\w+)$/.test(uri): {
            const hastag = /^https:\/\/m.tiktok.com\/node\/share\/tag\/(\w+)$/.exec(uri);
            if (hastag) {
                return { body: response.hashtag(hastag[1]) };
            }
            return { body: null };
        }
        case uri === 'https://m.tiktok.com/share/item/list':
            return { body: response.list() };
        case /^https:\/\/v([0-9]){2}.muscdn.com.+$/.test(uri):
            return Promise.resolve(
                'vid:v09044ae0000bk2qm0ivfsko76kvric01�gen)dataaweme_6647277225529838341]�mdatok�E���H��,� �#��x264 - core 152 r2854 e9a5903 - H.264/MPEG-4 AVC codec - Copy',
            );
        default:
            return { body: '' };
    }
};

export default request;
