import SearchedTweets from "./SearchedTweets";
import { render, fireEvent } from "@testing-library/react";

describe('SearchedTweets', () => {
    it('should render no tweets if no tweets are passed', () => {
        const { getByText } = render(<SearchedTweets draggable={true} />)
        expect(getByText('No tweets')).toBeDefined();
    });

    it('should render tweets if tweets are passed', () => {
        const tweets =[
            {
                profile_image_url: 'http://img1.jpg',
                userName: 'John',
                screenName: 'Johny',
                date: '22/01/2021',
                text: 'I am johny'
            },
            {
                profile_image_url: 'http://img2.jpg',
                userName: 'Nicholas',
                screenName: 'Nick',
                date: '24/01/2021',
                text: 'I am Nicholas'
            }
        ];
        const { getByTestId, getAllByTestId } = render(<SearchedTweets tweets={tweets} draggable={true} />);
        expect(getByTestId('searchedTweets')).toBeDefined();
        expect(getAllByTestId('profileDetails').length).toEqual(2);
    })

    it('should call setData when onDragStart', () => {
        const tweets =[
            {
                profile_image_url: 'http://img1.jpg',
                userName: 'John',
                screenName: 'Johny',
                date: '22/01/2021',
                text: 'I am johny'
            }
        ];
        const { getByTestId } = render(<SearchedTweets tweets={tweets} draggable={true} />);
        const tweet = getByTestId('profileDetails');
        const mockData = { setData: jest.fn()};
        fireEvent.dragStart(tweet, { dataTransfer: mockData});
        expect(mockData.setData).toHaveBeenCalledWith("index", 0);
    })
});