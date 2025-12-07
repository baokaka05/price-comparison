import { useState } from 'react'
import './App.css'
import productsData from './products.json'

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = productsData.filter(item => {
    const term = searchTerm.toLowerCase();
    const name = item.name || '';
    const wName = item.wooliesName || '';
    return name.toLowerCase().includes(term) || wName.toLowerCase().includes(term);
  });

  return (
    <div className="container">
      {/* 標題與搜尋區 (已設定為 Flex Column 置中) */}
      <header className="header">
        <h1>🛒 澳洲超市比價網</h1>
        <div className="search-box">
          <input 
            type="text" 
            placeholder="輸入商品關鍵字..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {/* 商品列表 */}
      <div className="grid-container">
        {filteredProducts.map((product) => {
          const cPrice = product.colesPrice ? `$${Number(product.colesPrice).toFixed(2)}` : 'N/A';
          const wPrice = product.wooliesPrice ? `$${Number(product.wooliesPrice).toFixed(2)}` : '-';
          
          return (
          <div key={product.id} className="product-card">
            
            {/* 圖片區 - 現在有 mix-blend-mode 讓背景透明 */}
            <div className="image-container">
              {product.image ? (
                <img src={product.image} alt={product.name} loading="lazy" />
              ) : (
                <div className="no-image">No Image</div>
              )}
              
              <div className={`status-badge ${product.winner}`}>
                {product.winner === 'coles' && 'Coles'}
                {product.winner === 'woolies' && 'Woolies'}
                {product.winner === 'draw' && '平手'}
              </div>
            </div>

            {/* 文字區 */}
            <div className="card-content">
              <div className="product-name" title={product.name}>
                {product.name}
              </div>
              
              <div className="price-row">
                <div className={`price-item ${product.winner === 'coles' ? 'winner coles-win' : (product.winner === 'woolies' ? 'loser' : '')}`}>
                  <span className="store-label">Coles</span>
                  <span className="price-val">{cPrice}</span>
                </div>

                <div className={`price-item ${product.winner === 'woolies' ? 'winner' : (product.winner === 'coles' ? 'loser' : '')}`}>
                  <span className="store-label">Woolies</span>
                  <span className="price-val">{wPrice}</span>
                </div>
              </div>
            </div>
          </div>
        )})}
      </div>
      
      {filteredProducts.length === 0 && (
        <p style={{textAlign: 'center', color: '#999', marginTop: '50px'}}>無符合搜尋結果</p>
      )}
    </div>
  )
}

export default App