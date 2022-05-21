課題18の実装について

課題17で作ったスライドショーに対して以下の項目を追加する


●ドットのページネーションを作る（renderPagiNation）slideImgData.lengthを使ってループで作る

●ページネーションに対してaddEventListenerを作る(addEventForPagiNation)
クリックしたら”is-active”を付与表示している画像に合わせてページNoを付与(renderActiveNumber()を実行する)

●3秒毎に画像を自動で切り替える機能を作る(autoPlay)
setIntervalを使って実行する

●自動で切り替わる機能を停止する機能を作る(resetAutoPlay)
clearIntervalを使って自動で切り替える機能を停止する

●ドットのページネーション・矢印のボタンをそれぞれ連動させる
ドットのページネーションの最後が"is-active"なら、next方向ボタンはdisable
ドットのページネーションの最初が"is-active"なら、prev方向ボタンはdisable
