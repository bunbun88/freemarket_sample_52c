class ItemsController < ApplicationController
  # before_action :set_category

  def index
    @item = Item.new
    @ladies = Item.order('id DESC').limit(4).where(category_id:1)
    @mens = Item.order('id DESC').limit(4).where(category_id:2)
    @babies = Item.order('id DESC').limit(4).where(category_id:3)
    @cosmes =Item.order('id DESC').limit(4).where(category_id:4)
    @chanels =Item.order('id DESC').limit(4).where(category_id:5)
    @louis =Item.order('id DESC').limit(4).where(category_id:6)
    @supremes =Item.order('id DESC').limit(4).where(category_id:7)
    @nikes =Item.order('id DESC').limit(4).where(category_id:8)
  end
  # def delete
  # end

  # def mypage
  # end

  def show
  end

  def sell
  end

  def buy
  end

  private
  def create_params
    params.require(:item).permit(:name,:price,:description,:status).merge(image_id: params[:image_id])
  end

  def set_category
    @category = Category.find(params[:category_id])
  end

end
