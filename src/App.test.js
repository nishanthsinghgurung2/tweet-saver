import { render, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from './App';
import mockTweets from './mockTweets';

const server = setupServer(
  rest.get('http://localhost:3000/searchTweets/tennis', (req, res, context) => {
    return res(context.json(mockTweets));
  })
);

const dragAndDrop = (sourceElement, destinationElement) => {
  const mockData = { setData: jest.fn(), getData: jest.fn().mockReturnValue(1)};
  fireEvent.dragStart(sourceElement, { dataTransfer: mockData});
  fireEvent.drop(destinationElement, { dataTransfer: mockData});
};

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('TweetSaverApp', () => {
  it('should render the app', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('TweetSaverApp')).toBeDefined();
    expect(getByTestId('searchTweet')).toBeDefined();
  })

  it('should show top 10 searched tweets', async () => {
    const { getByTestId, getAllByTestId } = render(<App />);
    const inputElem = getByTestId('searchTxt');
    const buttonElem = getByTestId('searchBtn');
    fireEvent.change(inputElem, { target: { value: 'tennis'}});
    fireEvent.click(buttonElem);
    await waitFor(() => {
      const tweets = getAllByTestId('profileDetails');
      expect(tweets.length).toEqual(10);
    }) 
  })

  it('should show error text when api returns error', async() => {
    server.use(
      rest.get('http://localhost:3000/searchTweets/tennis', (req, res, context) => {
        return res(context.status(500));
      })
    );
    const { getByTestId } = render(<App />);
    const searchInput = getByTestId('searchTxt');
    const searchButton = getByTestId('searchBtn') ;
    fireEvent.change(searchInput, { target: { value: 'tennis'}});
    fireEvent.click(searchButton);

    await waitFor(() => {
      const searchError = getByTestId('searchError');
      expect(searchError).toBeDefined();
    });
  })

  it('should show loading text when search tweet api call is in progress', async() => {
    const { getByTestId } = render(<App />);
    const searchInput = getByTestId('searchTxt');
    const searchButton = getByTestId('searchBtn');
    fireEvent.change(searchInput, { target: { value: 'tennis'}});
    searchButton.click();

    const searchLoading = getByTestId('searchLoading');
    expect(searchLoading).toBeDefined();
  })

  it('should show saved tweets on drag and drop', async() => {
    const { getByTestId, getAllByTestId } = render(<App />);
    const inputElem = getByTestId('searchTxt');
    const buttonElem = getByTestId('searchBtn');
    fireEvent.change(inputElem, { target: { value: 'tennis'}});
    fireEvent.click(buttonElem);
    await waitFor(() => {
      const tweet1 = getAllByTestId('tweet1')[0];
      const savedTweets = getByTestId('savedTweets');
      dragAndDrop(tweet1,savedTweets);
      const savedTweet = savedTweets.querySelector('#tweet1');
      expect(savedTweet).toBeDefined();
    }) 
  })
});
