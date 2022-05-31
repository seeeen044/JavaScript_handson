課題18の実装について

課題17で作ったスライドショーに対して以下の項目を追加する


●ドットのページネーションを作る（renderPagiNation）slideImgData.lengthを使ってループで作る

●ドットのページネーション・矢印のボタンをそれぞれ連動させる
ドットのページネーションの最後が"is-active"なら、next方向ボタンはdisable
ドットのページネーションの最初が"is-active"なら、prev方向ボタンはdisable

●スライドのカウンターを作成する

●矢印ボタンの切り替え部分を切り出した関数を作成する

●ページネーションの”is-show”を切り替える関数を作成する

●スライダーのカウンター、矢印ボタンのswith、ページネーションのswitch、disabledの関数を一つにまとめた関数を作成する→この関数のことを仮にAとする

●矢印ボタンの関数を整理し、Aを実行する

●ページネーションに対してaddEventListenerを作る(addEventForPagiNation)
クリックしたら”is-active”を付与表示している画像に合わせてページNoを付与(renderActiveNumber()を実行する)
Aを実行する

●3秒毎に画像を自動で切り替える機能を作る(autoPlay)
setIntervalを使って実行する

●自動で切り替わる機能を停止する機能を作る(resetAutoPlay)
clearIntervalを使って自動で切り替える機能を停止する
