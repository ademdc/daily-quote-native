import { categoryColors } from '../contants/colors';

export const quoteCategories = {
  love: 'Love',
  traveling: 'Traveling',
  motivational: 'Motivational',
  religion: 'Religion'
}

export const colorForCategory = (category) => {
  return categoryColors[category]
}

export const filterByCategory = (quotes, category) => {
  return quotes.filter(quote => quote.category === category)
}

export const filterByText = (quotes, text) => {
  return quotes.filter(quote => quote.text.includes(text))
}

export const setFilters = (quotes, categoryFilter) => {
  let filtered = null

  if(categoryFilter === 'All'){
     filtered = quotes
  }else if (categoryFilter === 'Active') {
    filtered = quotes.filter(quote => quote.daily_for_date === null)
  }else {
    filtered = quotes.filter(quote => quote.category === categoryFilter)
  }

  return filtered;
}